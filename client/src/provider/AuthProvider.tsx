import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import Cookies from 'js-cookie'

// Context

type User = {
  email: string;
  name: string;
}

type Token = string
// {
//   acessToken: string;
//   refreshToken: string;
// }

type AuthContextType = {
  user: User | null;
  token: Token | null;
  isAuthenticated: boolean;
  signInWithGoogle: (response: google.accounts.id.CredentialResponse) => Promise<void>;
  signInWithApple: () => Promise<void>;
  signout: () => Promise<void>;
};

const initialContextState: AuthContextType = {
  user: null,
  token: null,
  isAuthenticated: false,
  signInWithGoogle: () => Promise.resolve(),
  signInWithApple: () => Promise.resolve(),
  signout: () => Promise.resolve(),
};


export const AuthContext = createContext<AuthContextType>(initialContextState);


// Reducer


type AuthAction =
  | { type: 'LOGIN', user: User, token: Token, isAuthenticated: boolean }
  | { type: 'LOGOUT', user: User, token: Token, isAuthenticated: boolean }
  | { type: 'LOADING', isLoading: boolean }

type AuthState = {
  user: User | null;
  token: Token | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const initialReducerState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.user, token: action.token, isAuthenticated: action.isAuthenticated };
    case "LOGOUT":
      return { ...state, user: null, token: null, isAuthenticated: action.isAuthenticated };
    default:
      return state;
  }
};



export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialReducerState);

  const { user, token, isAuthenticated, isLoading } = state;

  const signInWithGoogle = async (response: google.accounts.id.CredentialResponse) => {
    const { data: res } = await axios({
      method: 'post',
      url: `${import.meta.env.VITE_URL}/user/google`,
      data: {
        token: response.credential
      }
    })
    if (res.ok) {
      const { accessToken, refreshToken, user: { email, name } } = res.data

      // TODO : access는 memory refresh는 local에 저장하기
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      const token = accessToken
      Cookies.set('TOKEN', token, { expires: 7 })
      dispatch({ type: 'LOGIN', user: { email, name }, token, isAuthenticated: true })

    } else {
      alert(res.message) // TODO: error handling
    }
  }

  const signInWithApple = async () => {
  }


  const signout = async () => {
  }


  useEffect(() => {
    //https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
    //에 따라 mehtod 를 한번만 call 하고 인증 관련 함수를 중앙화 하기 위해 이동
    const initGoogleAPIClient = () => {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: signInWithGoogle
      })
    }
    initGoogleAPIClient();
  }, [])

  useEffect(() => {
    console.log('local', localStorage.getItem('access'))
    // axios.interceptors.request.use(
    //   config => {
    //     console.log('interceptor config 설정됨')
    //     const token = localStorage.getItem('access')
    //     if (token) {
    //       config.headers['Authorization'] = 'Bearer ' + token;
    //     }
    //     return config;
    //   },
    // )
    console.log('token 셋팅완료')
    if(!token) delete axios.defaults.headers.common['Authorization']
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access');
  }, [token])



  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, signInWithGoogle, signInWithApple, signout }}>
      {/* {isLoading ? <div>Loading...</div> : children} */}
      {children}
    </AuthContext.Provider>
  )
}