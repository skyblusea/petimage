import axios from "axios";
import { useEffect, useRef } from "react";
import { getGoogleLoginUrl } from "../util/login";
import { Link } from "react-router-dom";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (typeof window === "undefined" || !window.google || !divRef.current) {
      return;
    }

    const handleCredentialResponse = async (response: google.accounts.id.CredentialResponse) => {

      const { data: res } = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_URL}/user/google`,
        data: {
          token: response.credential
        }
      })
      console.log(res)
    }


    try {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(divRef.current,{ 
        type: "standard",
        theme: "filled_blue", 
        size: "large",
      }  // customization attributes
      );
      // google.accounts.id.prompt(); // also display the One Tap dialog

    } catch (error) {
      console.error(error);
    }
  }, [window.google, divRef.current])

  return (
      <div ref={divRef}></div>
  )
}