import axios, { AxiosInstance } from "axios";
import { createContext, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";



type AuthContextType = {
  user : {
    email: string;
    name: string;
  } | null;
  signInWithGoogle: (response: google.accounts.id.CredentialResponse) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  signInWithGoogle: () => Promise.resolve(),
  user: null,
});



export function TestProvider({ apiClient }: { apiClient: AxiosInstance }) {
  const [user, setUser] = useState({ email: '', name: '' });
  const accessTokenRef = useRef();

  useEffect(() => {
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log('requestInterceptor 작동중')
        // Attach current access token ref value to outgoing request headers
        config.headers["Authorization"] = `Bearer ${accessTokenRef}`
        return config;
      },
    );

    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        // Cache new token from incoming response headers
        console.log('responseInterceptor 작동중')
        const { data: res } = response
        const { accessToken, user: { email, name } } = res.data
        setUser({ email, name })
        accessTokenRef.current = accessToken;
        return response;
      },
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

  const signInWithGoogle = async (response: google.accounts.id.CredentialResponse) => {
    try {
      await apiClient({
        method: 'post',
        url: `/user/google`,
        data: {
          token: response.credential
        }
      })
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  const context = {
    signInWithGoogle: signInWithGoogle,
    user: user,
  }


  return (
    <AuthContext.Provider value={context}>
      <Outlet />
    </AuthContext.Provider>
  );
}