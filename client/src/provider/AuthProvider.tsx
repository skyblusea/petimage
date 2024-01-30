
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
  token: Token;
  authClient: AxiosInstance;
  isAuthenticated: boolean;
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
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
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
  const { user, token, isAuthenticated} = state;
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
        if (response.config.url === '/user/apple') {
          const { data: res } = response
          const { accessToken, refreshToken, user: { _id: id, email, name } } = res.data
          console.log('response', response)
        //   {
        //     "data": {
        //         "ok": true,
        //         "data": {
        //             "user": {
        //                 "name": "민지 김",
        //                 "email": "sfvrwtxw52@privaterelay.appleid.com",
        //                 "provider": "apple",
        //                 "providerId": "000954.c51b17f4ab5b4724ae6262e8564faee7.0544",
        //                 "status": 1,
        //                 "marketing": false,
        //                 "_id": "65b8a08e964e28b613a66670",
        //                 "createdAt": "2024-01-30T07:09:02.211Z",
        //                 "updatedAt": "2024-01-30T07:09:02.211Z",
        //                 "__v": 0
        //             },
        //             "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhhMDhlOTY0ZTI4YjYxM2E2NjY3MCIsImlhdCI6MTcwNjU5ODU0MiwiZXhwIjoxNzA3MjAzMzQyfQ.fAAyaaLMeZyN5e-vDVv7_QWtaJQSTlrzxwD3K3V9nVg",
        //             "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY1OTg1NDIsImV4cCI6MTcxNDM3NDU0Mn0.FjgirNbgGnYZjeYRFXQjVKSHZI1RE22_wyeCeGmiUh4"
        //         }
        //     },
        //     "status": 200,
        //     "statusText": "OK",
        //     "headers": {
        //         "access-control-allow-credentials": "true",
        //         "access-control-allow-origin": "*",
        //         "connection": "keep-alive",
        //         "content-length": "656",
        //         "content-type": "application/json; charset=utf-8",
        //         "date": "Tue, 30 Jan 2024 07:09:02 GMT",
        //         "etag": "W/\"290-lRBc0c6PdXyMwf8h2R5vo+pQ2y8\"",
        //         "server": "nginx/1.18.0 (Ubuntu)",
        //         "x-powered-by": "Express"
        //     },
        //     "config": {
        //         "transitional": {
        //             "silentJSONParsing": true,
        //             "forcedJSONParsing": true,
        //             "clarifyTimeoutError": false
        //         },
        //         "adapter": [
        //             "xhr",
        //             "http"
        //         ],
        //         "transformRequest": [
        //             null
        //         ],
        //         "transformResponse": [
        //             null
        //         ],
        //         "timeout": 0,
        //         "xsrfCookieName": "XSRF-TOKEN",
        //         "xsrfHeaderName": "X-XSRF-TOKEN",
        //         "maxContentLength": -1,
        //         "maxBodyLength": -1,
        //         "env": {},
        //         "headers": {
        //             "Accept": "application/json, text/plain, */*",
        //             "Content-Type": "application/json"
        //         },
        //         "baseURL": "https://petimage.kr/api/v1",
        //         "method": "post",
        //         "url": "/user/apple",
        //         "data": "{\"token\":\"eyJraWQiOiJmaDZCczhDIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoicGV0aW1hZ2Uuc3J1LmNvbSIsImV4cCI6MTcwNjY4NDk0MiwiaWF0IjoxNzA2NTk4NTQyLCJzdWIiOiIwMDA5NTQuYzUxYjE3ZjRhYjViNDcyNGFlNjI2MmU4NTY0ZmFlZTcuMDU0NCIsImNfaGFzaCI6IkRJSlpnUDlEMDlKN0REOFFoTHZjeXciLCJlbWFpbCI6InNmdnJ3dHh3NTJAcHJpdmF0ZXJlbGF5LmFwcGxlaWQuY29tIiwiZW1haWxfdmVyaWZpZWQiOiJ0cnVlIiwiaXNfcHJpdmF0ZV9lbWFpbCI6InRydWUiLCJhdXRoX3RpbWUiOjE3MDY1OTg1NDIsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZX0.NOputirUa7Hw0GfgciYX0vOpDY_U0Zb1Q4at_9e9AjHiBYhcqFSdhQIPH3A-iG3OaoDfcPl4mtayZGcABWdSqTc67gD06NVaIfdbPh1ND_e7E4HwnMz6wqC7j7jF_WCPAkNM8FOGlcXd0vBJCLEhqXijWCcwxFE9mhHWy9opr5Ah85YdWvuWoz8wghJ42d4lstCx3sc25DmZ3uv1sDtQwMXOmWAenCSTVb3fT1zYzw5DrCCY5WgvACQxKMeeyJxTaEZqqSbofql_s3vjLePdylphMfTmJbnoJ2z8ySp4l4aq5CT13LsY32u0DkuXMz1FOEtt2A2rQYIPSpXzWm-omw\",\"name\":\"민지 김\",\"email\":\"sfvrwtxw52@privaterelay.appleid.com\"}"
        //     },
        //     "request": {}
        // }
          console.log('res', res)
        //   {
        //     "ok": true,
        //     "data": {
        //         "user": {
        //             "name": "민지 김",
        //             "email": "sfvrwtxw52@privaterelay.appleid.com",
        //             "provider": "apple",
        //             "providerId": "000954.c51b17f4ab5b4724ae6262e8564faee7.0544",
        //             "status": 1,
        //             "marketing": false,
        //             "_id": "65b8a08e964e28b613a66670",
        //             "createdAt": "2024-01-30T07:09:02.211Z",
        //             "updatedAt": "2024-01-30T07:09:02.211Z",
        //             "__v": 0
        //         },
        //         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YjhhMDhlOTY0ZTI4YjYxM2E2NjY3MCIsImlhdCI6MTcwNjU5ODU0MiwiZXhwIjoxNzA3MjAzMzQyfQ.fAAyaaLMeZyN5e-vDVv7_QWtaJQSTlrzxwD3K3V9nVg",
        //         "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY1OTg1NDIsImV4cCI6MTcxNDM3NDU0Mn0.FjgirNbgGnYZjeYRFXQjVKSHZI1RE22_wyeCeGmiUh4"
        //     }
        // }
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
        alert('로그인 성공')
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
      console.log('signinWithApple', res)
      if(res){
        const { authorization: { id_token }, user : { name : {firstName,lastName}, email } } = res
        const login = await apiClient.post('/user/apple', { 
          token : id_token,
          name : `${firstName} ${lastName}`,
          email 
         })

         console.log(login)
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

  const context = {
    user,
    token,
    authClient,
    isAuthenticated,
    signInWithGoogle,
    signInWithApple,
    logout,
  };



  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  )
}