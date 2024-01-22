
import { createContext, useEffect, useReducer, useRef } from "react";
import { apiClient, authClient } from "../util/axiosInstance";
import { QueryClient } from "@tanstack/react-query"
import { tossWidgetQuery } from "../page/payment/checkout/page";
import { Outlet, useNavigate } from "react-router-dom";



// Context

type User = {
  email: string;
  name: string;
} | undefined

export type Token = {
  access: string;
  refresh: string;
} | undefined

export type AuthContextType = {
  user: User | null;
  isAuthenticated: () => void;
  signInWithGoogle?: (response: google.accounts.id.CredentialResponse) => Promise<void>;
  // signInWithApple: () => Promise<void>;
  // signout: () => Promise<void>;
  logout: () => void;
  token: Token | null;
};

const initialContextState: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: () => { },
  signInWithGoogle: () => Promise.resolve(),
  // signInWithApple: () => Promise.resolve(),
  // signout: () => Promise.resolve(),
  logout: () => { },
};


export const AuthContext = createContext<AuthContextType>(initialContextState);


// Reducer


type AuthAction =
  | { type: 'LOGIN', user: User }
  | { type: 'LOGOUT' }
  | { type: 'LOADING', isLoading: boolean }

type AuthState = {
  user: User;
  isAuthenticated: boolean;
};

const initialReducerState: AuthState = {
  user: undefined,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, user: undefined, isAuthenticated: false };
    default:
      return state;
  }
};



export default function AuthProvider({ 
  queryClient,
}:{ 
  queryClient : QueryClient 
}) {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);
  const { user } = state;
  const tokenRef = useRef<Token | undefined>();
  const navigate = useNavigate();
  const isAuthenticated = () => {
    tokenRefresh(tokenRef.current)
  }


  useEffect(() => {
    console.log('init interceptor')

    const prefetchingTossWidget = async (acessToken:string) => {
      const query = tossWidgetQuery(acessToken)
      await queryClient.prefetchQuery(query)
    }
    if (!tokenRef.current) {
      console.log('토큰 로컬에서 저장')
      const access = localStorage.getItem('access')
      const refresh = localStorage.getItem('refresh')
      if (access && refresh) {
        tokenRef.current = { access, refresh }
        prefetchingTossWidget(access)
        dispatch({ type: 'LOGIN', user: { email: '', name: '' } })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    }

  

    const authRequestInterceptor = authClient.interceptors.request.use(
      (config) => {
        console.log('requestInterceptor 작동중')
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${tokenRef.current?.access}`;
        return config;
      })

    const authResponseInterceptor = authClient.interceptors.response.use(undefined,
      (error) => {
        const errorMsg = error.response.data.data;
        console.log('interceptor catched error', error)
        switch (error.response.status) {
          case 401:
            console.error("refresh token error | ", errorMsg);
            break;
          case 403: {
            console.error("access token error | ", errorMsg);
            tokenRefresh(tokenRef.current);
            break;
          }
          default:
            return Promise.reject(error);
        }
      }
    );

    const apiResponseInterceptor = apiClient.interceptors.response.use(
      async(response) => {
        // Cache new token from incoming response headers
        console.log('responseInterceptor 작동중')
        // 로그인 시에만 토큰 저장
        if (response.config.url === '/user/google' || response.config.url === '/user/refresh') {
          const { data: res } = response
          const { accessToken, refreshToken, user: { email, name } } = res.data
          dispatch({ type: 'LOGIN', user: { email, name } })
          //TODO : 수정 필요 cookie
          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', refreshToken);
          tokenRef.current = { access: accessToken, refresh: refreshToken };
          prefetchingTossWidget(accessToken)
        }
        return response;
      },
    );

    // Return cleanup function to remove interceptors if apiClient updates
    return () => {
      authClient.interceptors.request.eject(authRequestInterceptor);
      authClient.interceptors.response.eject(authResponseInterceptor);
      apiClient.interceptors.response.eject(apiResponseInterceptor);
    };
  }, [tokenRef]);

  const signInWithGoogle = async (response: google.accounts.id.CredentialResponse) => {
    console.log('signInWithGoogle 실행중')
    try {
      const res = await apiClient.post('/user/google', { token: response.credential })
      if (res.data.ok) {
        alert('로그인 성공')
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const tokenRefresh = async (token: Token) => {
    console.log('토큰 리프레시 실행중')
    if (!token) {
      alert('토큰이 없습니다.')
      dispatch({ type: 'LOGOUT' })
      // navigate('/')
      return
    }
    authClient
      .get(`/user/refresh`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          refresh: token.refresh,
        },
      })
      .catch((err) => {
        console.log('발급 실패!')
        if (err.response.status === 401) {
          alert("로그인이 만료되었습니다.")
          dispatch({ type: 'LOGOUT' })
          // navigate("/")
        }
      });
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    dispatch({ type: 'LOGOUT' })
    tokenRef.current = undefined
    // navigate('/')
    alert('로그아웃 되었습니다.')
  }
  // console.log('tokenRef', tokenRef.current)


  const context = {
    user,
    token : tokenRef.current,
    isAuthenticated,
    signInWithGoogle,
    logout,
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  )
}