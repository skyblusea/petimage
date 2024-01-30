
import styled from "@emotion/styled";
import { useEffect } from "react";

export default function AppleLoginBtn() {


  useEffect(() => {
    const signInWithApple = async () => {
      //@ts-ignore
      if (typeof window === "undefined" || !window.AppleID) {
        return;
      }
      //@ts-ignore
      window.AppleID.auth.init({
        clientId: `${import.meta.env.VITE_APPLE_CLIENT_ID}`,
        scope: 'name email',
        redirectURI: `${import.meta.env.VITE_URL}`,
        state: 'state',
        nonce: 'nonce',
        usePopup: true
      });
      // try {
      //   const res = await window.AppleID.auth.signIn()
      //   console.log('res', res)
      //   // Handle successful response.
      // } catch (error) {
      //   // Handle error.
      // }
    }
    signInWithApple()
  }, [])



  return <ButtonWrapper><div id="appleid-signin" className="appleid-signin" data-color="black" data-border="true" data-type="sign in" /></ButtonWrapper>
}

const ButtonWrapper = styled.div`
  .appleid-signin{
    height: 40px; //구글 버튼과 동일하게 맞춤
  }
`