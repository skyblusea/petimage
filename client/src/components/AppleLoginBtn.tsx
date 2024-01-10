import { useEffect } from "react";

export default function AppleLoginBtn() {


  useEffect(() => {
    if (typeof window === "undefined" || !window.AppleID) {
      return;
    }
    AppleID.auth.init({
      clientId: 'petimage.src.com',
      scope: 'name email',
      redirectURI: 'https://petimage.vercel.app/',
      state: 'state',
      nonce: 'nonce',
      usePopup: true
    });

    try {
      // const data = await AppleID.auth.signIn()

      // Handle successful response.
    } catch (error) {
      // Handle error.
    }


  }, [])


  return <div id="appleid-signin" data-color="black" data-border="true" data-type="sign in"></div>
}