
import { createContext, useEffect, useReducer } from "react";
import { QueryClient } from "@tanstack/react-query"
import { tossWidgetQuery } from "../page/checkout/page";
import { Outlet, useNavigate } from "react-router-dom";
import { User, Token } from "../types"
import axios, { AxiosInstance } from "axios";
import { apiClient } from "../util/axiosInstance";


// Context

export type AuthContextType = {
  user: User | null;
  signInWithGoogle?: (response: google.accounts.id.CredentialResponse) => Promise<void>;
  signInWithApple: () => Promise<void>;
  logout: () => void;
  signout: () => void;
  token: Token;
  authClient: AxiosInstance;
  isAuthenticated: boolean;
  loginModalOpen?: boolean;
  setLoginModal : (open: boolean) => void;
};

const initialContextState: AuthContextType = {
  user: null,
  token: {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
  },
  authClient: axios.create({
    baseURL: `${import.meta.env.VITE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  signInWithGoogle: () => Promise.resolve(),
  signInWithApple: () => Promise.resolve(),
  logout: () => { },
  signout: () => { },
  isAuthenticated: false,
  loginModalOpen: false,
  setLoginModal: () => { },
};


export const AuthContext = createContext<AuthContextType>(initialContextState);


// Reducer


type AuthAction =
  | { type: 'LOGIN', user: User, token: Token }
  | { type: 'LOGOUT' }
  | { type: 'LOADING', isLoading: boolean }
  | { type: 'TOKEN REFRESH', token: Token }
  | { type: 'SETAUTH', isAuthenticated: boolean }
  | { type: 'LOGIN_MODAL', loginModalOpen: boolean }

type AuthState = {
  user: User | null;
  token: Token;
  isAuthenticated: boolean;
  loginModalOpen?: boolean;
};


const initialReducerState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
  },
  isAuthenticated: false,
  loginModalOpen: false,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, token: action.token };
    case "LOGOUT":
      return { ...state, user: null, token: { access: null, refresh: null }, isAuthenticated: false};
    case "TOKEN REFRESH":
      return { ...state, token: action.token };
    case "SETAUTH":
      return { ...state, isAuthenticated: action.isAuthenticated };
    case "LOGIN_MODAL":
      return { ...state, loginModalOpen: action.loginModalOpen };
    default:
      return state;
  }
};




export default function AuthProvider({
  queryClient,
  authClient,
}: {
  queryClient: QueryClient
  authClient: AxiosInstance
}) {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);
  const { user, token, isAuthenticated, loginModalOpen} = state;
  // const tokenRef = useRef<Token>(null);
  const navigate = useNavigate();
  const controller = new AbortController();

  useEffect(() => {
    const authRequestInterceptor = authClient.interceptors.request.use(
      (config) => {
        // user 이 없을 경우 요청 취소
        config.signal = controller.signal;
        if(!user) controller.abort()
        
        console.log('헤더 토큰 추가')
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${token.access}`;
        return config;
      })

    
    const authResponseInterceptor = authClient.interceptors.response.use(
      async (response) => {
        // 토큰 리프레시

        if (response.config.url === '/user/refresh') {
          console.log(`response.config.url === '/user/refresh'`)  
          const { data: res } = response
          const { accessToken, refreshToken } = res.data
          dispatch({ type: 'TOKEN REFRESH', token: { access: accessToken, refresh: refreshToken } })
          //TODO : 수정 필요 maybe cookie
          console.log('토큰 리프레시됨')

          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', refreshToken);
          console.log('리프레시 후 토큰', accessToken, refreshToken)

        }
        return response;
      },
      async(error) => {
        const errorMsg = error.response.data.data;
        const originalRequest = error.config;
        console.log('error.response.status',error)

        switch (error.response.status) {
          case 401:
            console.error("refresh token error | ", errorMsg);
            console.log('401에러')
            alert('로그인이 만료되었습니다.')
            logout();
            break;
          case 403: {
            console.error("access token error | ", errorMsg);
            console.log('리프레시 전 토큰', token.access, token.refresh)
            const result = await tokenRefresh();
            console.log('result',result)
            //! Test 필요
            if (result) {
              originalRequest.headers["Authorization"] = `Bearer ${result}`;
              if(error.config.url === '/file/upload?filePath='){
                // axios error 에 formData가 유지되지 않음 => 다시 시도하도록 유도
                alert('파일 업로드에 실패했습니다. 다시 시도해주세요.')
                return Promise.reject(error); 
              }
              return apiClient(originalRequest);
            } else {
              console.log('리프래시했지만 실패')
              logout();
            }
            break;
          }
          default:
            return Promise.reject(error);
        }
      }
    );
    

    const apiResponseInterceptor = apiClient.interceptors.response.use(
      async (response) => {
        // 로그인 
        if (response.config.url === '/user/google' || response.config.url === '/user/apple') {
          const { data: res } = response
          const { accessToken, refreshToken, user: { _id: id, email, name } } = res.data
          const user = { id, email, name }
          dispatch({ type: 'LOGIN', user, token: { access: accessToken, refresh: refreshToken } })
          //TODO : 수정 필요 maybe cookie
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', refreshToken);
          //TOSS 위젯 prefetching
          const query = tossWidgetQuery(id)
          await queryClient.prefetchQuery(query)
        }
        return response;
      },
      );
    dispatch({ type: 'SETAUTH', isAuthenticated: true })
    // Return cleanup function to remove interceptors if apiClient updates
    return () => {
      authClient.interceptors.request.eject(authRequestInterceptor);
      authClient.interceptors.response.eject(authResponseInterceptor);
      apiClient.interceptors.response.eject(apiResponseInterceptor);
    };
  }, [token, queryClient]);

  const signInWithGoogle = async (response: google.accounts.id.CredentialResponse) => {
    try {
      const res = await apiClient.post('/user/google', { token: response.credential })
      if (res.data.ok) {
        alert('로그인이 완료되었습니다.')
        setLoginModal(false)
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const signInWithApple = async () => {
    try {
      //@ts-ignore
      const res = await window.AppleID.auth.signIn();
      if(res){
        const { authorization: { id_token } } = res
        const user = res.user
        const login = await apiClient.post('/user/apple', { 
          token : id_token,
          name : user ?`${user.name.lastName}${user.name.lastName}`: null,
          email : user ? user.email : null,
         })
        if(login.data.ok) {
          alert('로그인이 완료되었습니다.')
          setLoginModal(false)
          navigate('/')
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const tokenRefresh = () => {
    console.log('토큰 리프레시')
    const token = getTokenfromLocalStorage()
    if (!token) return false
    return authClient
      .get(`/user/refresh`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          refresh: token.refresh,
        },
      })
      .then((res)=>{
        if (res.data.ok) {
          const { accessToken } = res.data.data
          return accessToken
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("로그인이 만료되었습니다.")
          return false
        }
      });
    
  }

  const getTokenfromLocalStorage = () => {
    const access = localStorage.getItem('access')
    const refresh = localStorage.getItem('refresh')
    if (!access || !refresh) return null
    const token = { access, refresh }
    dispatch({ type: 'TOKEN REFRESH', token })
    return token
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
    queryClient.clear() // (1)loader 에선 authProvider 접근 불가능 (2)axios.interceptor status check 불가능 => querykey user 변수 불가능 하므로 clear
    dispatch({ type: 'LOGOUT' })
    return navigate('/')
  }

  const signout = async () => {
    try {
      //@ts-ignore
      if(res){
        const res = await authClient.post('/user/delete')
        if(res.data.ok) {
          alert('회원 탈퇴가 완료되었습니다.')
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const setLoginModal = (open:boolean) => {
    dispatch({ type: 'LOGIN_MODAL', loginModalOpen: open })
  }

  const context = {
    user,
    token,
    authClient,
    isAuthenticated,
    signInWithGoogle,
    signInWithApple,
    logout,
    signout,
    setLoginModal,
    loginModalOpen,
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  )
}