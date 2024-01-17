
import { createContext, useEffect, useLayoutEffect, useReducer, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { apiClient, authClient } from "../util/axiosInstance";
import Loading from "../components/Loading";
import { Backdrop } from "@mui/material";

// Context

type User = {
  email: string;
  name: string;
} | undefined

type Token = {
  access: string;
  refresh: string;
} | undefined

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  // signInWithApple: () => Promise<void>;
  // signout: () => Promise<void>;
  logout: () => void;
};

const initialContextState: AuthContextType = {
  user: null,
  isAuthenticated: false,
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
  isLoading: boolean;
};

const initialReducerState: AuthState = {
  user: undefined,
  isAuthenticated: false,
  isLoading: false
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



export default function AuthProvider() {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);
  const { user, isAuthenticated, isLoading } = state;
  const tokenRef = useRef<Token | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('init interceptor')

    if (tokenRef.current === undefined) {
      console.log('토큰 로컬에서 저장')
      const access = localStorage.getItem('access')
      const refresh = localStorage.getItem('refresh')
      if (access && refresh) {
        tokenRef.current = { access, refresh }
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
      (response) => {
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

  useEffect(() => {
    //https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
    //에 따라 mehtod 를 한번만 call 하고 인증 관련 함수를 중앙화 하기 위해 이동
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
    const initGoogleAPIClient = () => {
      console.log('init google api client')
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: signInWithGoogle
      })
    }
    initGoogleAPIClient();
  }, [])

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

  const logout = () => { }


  const context = {
    user,
    isAuthenticated,
    logout
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
      <Backdrop open>
        <Loading />
      </Backdrop>
    </AuthContext.Provider>
  )

}