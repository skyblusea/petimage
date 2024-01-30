
import styled from "@emotion/styled";
import { useEffect } from "react";
import useAuth from "../util/useAuth";

export default function AppleLoginBtn() {


  useEffect(() => {
    //@ts-ignore
    if (typeof window === "undefined" || !window.AppleID) {
      return;
    }
    //@ts-ignore
    window.AppleID.auth.init({
      clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
      redirectURI: `${import.meta.env.VITE_APPLE_REDIRECT_URL}`,
      scope: 'name email',
      usePopup: true
    });
  }, [])

  const { signInWithApple } = useAuth()


  return <ButtonWrapper>
    <div onClick={signInWithApple} id="appleid-signin" className="appleid-signin" data-color="black" data-border="true" data-type="sign in" /></ButtonWrapper>
}

const ButtonWrapper = styled.div`
  .appleid-signin{
    height: 40px; //구글 버튼과 동일하게 맞춤
  }
`