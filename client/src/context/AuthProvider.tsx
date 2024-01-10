import axios from "axios";
import { createContext, useReducer } from "react";

type User = {
  email: string;
  name: string;
}

type Token = {
  acessToken: string;
  refreshToken: string;
}

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
    if (res.ok){
      const { acessToken, refreshToken, user:{ email, name } } = res.data
      dispatch({ type: 'LOGIN', user:{email, name}, token:{ acessToken, refreshToken }, isAuthenticated: true })
    }else {
      alert(res.message) // TODO: error handling
    }
  }

  const signInWithApple = async () => {
  }

  const signout = async () => {
  
  }



  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, signInWithGoogle, signInWithApple, signout }}>
      {/* {isLoading ? <div>Loading...</div> : children} */}
      {children}
    </AuthContext.Provider>
  )
}