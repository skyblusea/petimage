import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { getGoogleLoginUrl } from "../util/login";
import { AuthContext } from "../context/AuthProvider";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLDivElement>(null);

  const { signInWithGoogle } = useContext(AuthContext)

  useEffect(() => {
    if (typeof window === "undefined" || !window.google || !divRef.current) {
      return;
    }
    try {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: signInWithGoogle
      });
      google.accounts.id.renderButton(divRef.current,{ 
        type: "standard",
        theme: "filled_blue", 
        size: "large",
        width: divRef.current.clientWidth,
      }
      );
    } catch (error) {
      console.error(error);
    }
  }, [signInWithGoogle])

  return (
      <div ref={divRef}></div>
  )
}