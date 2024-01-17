import { createContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useSubmit } from "react-router-dom";
import { apiClient, authClient } from "../util/axiosInstance";





type User = {
  email: string;
  name: string;
}

type Token = {
  access: string;
  refresh: string;
} | undefined

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



export function TestProvider() {
  const [user, setUser] = useState<User | undefined>();
  const tokenRef = useRef<Token | undefined>();
  // 토큰은 ui 렌더링에 영향을 주지 않으므로 ref 로 관리
  // app 이 token changea에 대해 re-rendering 되지 않도록 하기 위함, ui components들과 decoupling 하기 위함
  const navigate = useNavigate();

  useEffect(() => {
    console.log('init interceptor')

    if(tokenRef.current === undefined){
      console.log('토큰 로컬에서 저장')
      const access = localStorage.getItem('access') 
      const refresh = localStorage.getItem('refresh')
      if(access && refresh){
        tokenRef.current = {access, refresh}
      }
    }

    // if(tokenRef.current){
      console.log('토큰 액션에 전달')
      const formData = new FormData()
      formData.append('isLoggedin', 'true`')
      submit(formData, { method: 'post' })
    // }

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
          setUser({ email, name })
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
  }, []);

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
          navigate('/')
        }
      })
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const tokenRefresh = async (token: Token) => {
    console.log('토큰 리프레시 실행중')
    if (!token) {
      alert('토큰이 없습니다.')
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
          navigate("/")
        }
      });
  }



  const context = {
    user,
    isAuthenticated,
    signInWithGoogle,
  }


  return (
    <TestContext.Provider value={context}>
      <Outlet />
    </TestContext.Provider>
  );
}



