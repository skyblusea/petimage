
import { createContext, useEffect, useReducer } from "react";
import { apiClient, authClient } from "../util/axiosInstance";
import { QueryClient } from "@tanstack/react-query"
import { tossWidgetQuery } from "../page/payment/checkout/page";
import { Outlet, useNavigate } from "react-router-dom";
import { User, Token } from "../types"


// Context

export type AuthContextType = {
  user: User | null;
  signInWithGoogle?: (response: google.accounts.id.CredentialResponse) => Promise<void>;
  // signInWithApple: () => Promise<void>;
  logout: () => void;
  token: Token;
};

const initialContextState: AuthContextType = {
  user: null,
  token: {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('access'),
  },
  signInWithGoogle: () => Promise.resolve(),
  // signInWithApple: () => Promise.resolve(),
  logout: () => { },
};


export const AuthContext = createContext<AuthContextType>(initialContextState);


// Reducer


type AuthAction =
  | { type: 'LOGIN', user: User, token: Token }
  | { type: 'LOGOUT' }
  | { type: 'LOADING', isLoading: boolean }
  | { type: 'TOKEN REFRESH', token: Token }

type AuthState = {
  user: User | null;
  token: Token;
};


const initialReducerState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
  },
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, token: action.token };
    case "LOGOUT":
      return { ...state, user: null, token: { access: null, refresh: null } };
    case "TOKEN REFRESH":
      return { ...state, token: action.token };
    default:
      return state;
  }
};



export default function AuthProvider({
  queryClient,
}: {
  queryClient: QueryClient
}) {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);
  const { user, token } = state;
  // const tokenRef = useRef<Token>(null);
  const navigate = useNavigate();


  useEffect(() => {
    console.log('init interceptor')
    const authRequestInterceptor = authClient.interceptors.request.use(
      (config) => {
        console.log('requestInterceptor 작동중')
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${token.access}`;
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
            tokenRefresh(token);
            break;
          }
          default:
            return Promise.reject(error);
        }
      }
    );

    const apiResponseInterceptor = apiClient.interceptors.response.use(
      async (response) => {
        console.log('responseInterceptor 작동중')
        // 로그인 
        if (response.config.url === '/user/google') {
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
        // 토큰 리프레시
        if (response.config.url === '/user/refresh') {
          const { data: res } = response
          const { accessToken, refreshToken } = res.data
          dispatch({ type: 'TOKEN REFRESH', token: { access: accessToken, refresh: refreshToken } })
          //TODO : 수정 필요 maybe cookie
          localStorage.setItem('access', accessToken);
          localStorage.setItem('refresh', refreshToken);
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
  }, []);

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
      navigate('/')
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
          navigate("/")
        }
      });
  }

  const logout = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    navigate('/')
    alert('로그아웃 되었습니다.')
  }

  const context = {
    user,
    token,
    signInWithGoogle,
    logout,
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  )
}