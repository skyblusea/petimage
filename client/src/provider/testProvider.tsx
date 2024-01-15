import axios, { AxiosInstance } from "axios";
import { Children, createContext, useContext, useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { testClient } from "../main";
import { testClinet } from "../util/axiosInstance";

type User = {
  email: string;
  name: string;
}

type Token = {
  access: string;
  refresh: string;
}

type TestContextType = {
  user: User | undefined;
  isAuthenticated: () => boolean;
  signInWithGoogle: (response: google.accounts.id.CredentialResponse) => Promise<void>;
};

export const TestContext = createContext<TestContextType>({
  user: undefined,
  isAuthenticated: () => false,
  signInWithGoogle: () => Promise.resolve(),
});




export function TestProvider({ children }: { children: JSX.Element | JSX.Element[] }) {
  const [user, setUser] = useState<User | undefined>();
  const tokenRef = useRef<Token | undefined>();
  // const navigate = useNavigate();

  const apiClient = testClinet
  useEffect(() => {
    console.log('useEffect 작동중')
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log('requestInterceptor 작동중')
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${tokenRef.current?.access}`;
        return config;
      },
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        // Cache new token from incoming response headers
        console.log('responseInterceptor 작동중')
        if (response.config.url === '/user/google') {
          const { data: res } = response
          const { accessToken, refreshToken, user: { email, name } } = res.data
          setUser({ email, name })
          tokenRef.current = { access: accessToken, refresh: refreshToken };
        }
        return response;
      },
      (error) => {
        const errorMsg = error.response.data.data;
        switch (error.response.status) {
          case 401:
            console.error("refresh token error | ", errorMsg);
            break;
          case 403: {
            console.error("access token error | ", errorMsg);
            // tokenRefresh(tokenRef.current);
            break;
          }
          default:
            return Promise.reject(error);
        }
      }
    );

    // Return cleanup function to remove interceptors if apiClient updates
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [apiClient]);

  useEffect(() => {
    //https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
    //에 따라 mehtod 를 한번만 call 하고 인증 관련 함수를 중앙화 하기 위해 이동
    const initGoogleAPIClient = () => {
      console.log('init google api client')
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: signInWithGoogle
      })
    }
    initGoogleAPIClient();
  }, [])

  const isAuthenticated = () => {
    return tokenRef.current !== undefined;
  }

  const signInWithGoogle = async (response: google.accounts.id.CredentialResponse) => {
    console.log('signin with google 실행중')
    try {
      await apiClient({
        method: 'post',
        url: `/user/google`,
        data: {
          token: response.credential
        }
      }).then((res) => {
        if (res.status === 200) {
          alert('로그인 성공')
          // navigate('x')
        }
      })
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const context = {
    user: user,
    isAuthenticated: isAuthenticated,
    signInWithGoogle: signInWithGoogle,
  }


  return (
    <TestContext.Provider value={context}>
      {/* <Outlet /> */}
      {children}
    </TestContext.Provider>
  );
}



