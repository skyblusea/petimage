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
};

const initialContextState: AuthContextType = {
  user: {
    "id": "658a43a4e26d9227a64da419",
    "email": "blueseablueskyblueme@gmail.com",
    "name": "김민지"
  },
  token: {
    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGE0M2E0ZTI2ZDkyMjdhNjRkYTQxOSIsImlhdCI6MTcwNjU5OTgxNSwiZXhwIjoxNzA3MjA0NjE1fQ.esuwcnaF8s1Dxb1H3ZSQ-M-uTKT2LasgOtRHOD7Snb4',
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY1OTk4MTUsImV4cCI6MTcxNDM3NTgxNX0.x2GuViV1nb8Wqvekhfh-_5aQNweJhHgeQFhSI9AuqYc',
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
};


export const AuthContext = createContext<AuthContextType>(initialContextState);


// Reducer


type AuthAction =
  | { type: 'LOGIN', user: User, token: Token }
  | { type: 'LOGOUT' }
  | { type: 'LOADING', isLoading: boolean }
  | { type: 'TOKEN REFRESH', token: Token }
  | { type: 'SETAUTH', isAuthenticated: boolean }

type AuthState = {
  user: User | null;
  token: Token;
  isAuthenticated: boolean;
};


const initialReducerState: AuthState = {
  user: {
    "id": "658a43a4e26d9227a64da419",
    "email": "blueseablueskyblueme@gmail.com",
    "name": "김민지"
  },
  token: {
    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGE0M2E0ZTI2ZDkyMjdhNjRkYTQxOSIsImlhdCI6MTcwNjU5OTgxNSwiZXhwIjoxNzA3MjA0NjE1fQ.esuwcnaF8s1Dxb1H3ZSQ-M-uTKT2LasgOtRHOD7Snb4',
    refresh: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY1OTk4MTUsImV4cCI6MTcxNDM3NTgxNX0.x2GuViV1nb8Wqvekhfh-_5aQNweJhHgeQFhSI9AuqYc',
  },
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, token: action.token };
    case "LOGOUT":
      return { ...state, user: null, token: { access: null, refresh: null } };
    case "TOKEN REFRESH":
      return { ...state, token: action.token };
    case "SETAUTH":
      return { ...state, isAuthenticated: action.isAuthenticated };
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
  const { user, token, isAuthenticated } = state;
  // const tokenRef = useRef<Token>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authRequestInterceptor = authClient.interceptors.request.use(
      (config) => {
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${token.access}`;
        return config;
      })


    const authResponseInterceptor = authClient.interceptors.response.use(undefined,
      (error) => {
        const errorMsg = error.response.data.data;
        // const originalRequest = error.config;
        switch (error.response.status) {
          case 401:
            console.error("refresh token error | ", errorMsg);
            break;
          case 403: {
            console.error("access token error | ", errorMsg);
            tokenRefresh();
            // return authClient(originalRequest);
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
      if (res) {
        const { authorization: { id_token } } = res
        const user = res.user
        const login = await apiClient.post('/user/apple', {
          token: id_token,
          name: user ? `${user.name.lastName}${user.name.lastName}` : null,
          email: user ? user.email : null,
        })
        if (login.data.ok) {
          alert('로그인이 완료되었습니다.')
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const tokenRefresh = async () => {
    const token = getTokenfromLocalStorage()
    if (!token) return logout()
    authClient
      .get(`/user/refresh`, {
        headers: {
          Authorization: `Bearer ${token.access}`,
          refresh: token.refresh,
        },
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("로그인이 만료되었습니다.")
          return logout()
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
    dispatch({ type: 'LOGOUT' })
    alert('로그아웃 되었습니다.')
    return navigate('/')
  }

  const signout = async () => {
    try {
      //@ts-ignore
      if (res) {
        const res = await authClient.post('/user/delete')
        if (res.data.ok) {
          alert('회원 탈퇴가 완료되었습니다.')
          navigate('/')
        }
      }
    } catch (error) {
      console.log(error);
    }
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
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  )
}