import { useEffect, useRef } from "react";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (typeof window === "undefined" || !window.google || !divRef.current) {
      return;
    }

    const handleCredentialResponse = (response: google.accounts.id.CredentialResponse) => {
      console.log("Encoded JWT ID token: " + response.credential);
    }

    try {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
      });
      google.accounts.id.renderButton(
        divRef.current,
        { type: "standard", theme: "filled_blue", size: "large" }  // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog

    } catch (error) {
      console.error(error);
    }
  }, [window.google, divRef.current])

  return (
    <div id="googleLoginBtn" ref={divRef}></div>
  )
}