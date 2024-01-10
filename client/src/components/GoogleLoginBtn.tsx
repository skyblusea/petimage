import axios from "axios";
import { useEffect, useRef } from "react";
import { getGoogleLoginUrl, getTokenURL } from "../util/login";
import { Link } from "react-router-dom";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLAnchorElement>(null);

  // useEffect(() => {

  //   if (typeof window === "undefined" || !window.google || !divRef.current) {
  //     return;
  //   }

  //   const handleCredentialResponse = (response: google.accounts.id.CredentialResponse) => {
  //     console.log('response', response)
  //     console.log("Encoded JWT ID token: " + response.credential);
  //     axios.post(`${import.meta.env.VITE_URL}/user/google`, { token: response.credential }).then(res => {
  //       console.log('post res', res);
  //     })
  //   }


  //   try {
  //     google.accounts.id.initialize({
  //       client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //       callback: handleCredentialResponse
  //     });
  //     google.accounts.id.renderButton(
  //       divRef.current,
  //       { type: "standard", theme: "filled_blue", size: "large" }  // customization attributes
  //     );
  //     // google.accounts.id.prompt(); // also display the One Tap dialog

  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [window.google, divRef.current])

  const client = google.accounts.oauth2.initCodeClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
    ux_mode: 'popup',
    callback: (response) => {

      console.log('google authorization code', response)
      // const xhr = new XMLHttpRequest();
      // xhr.open('POST', code_receiver_uri, true);
      // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      // // Set custom header for CRSF
      // xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
      // xhr.onload = function() {
      //   console.log('Auth code response: ' + xhr.responseText);
      // };
      // xhr.send('code=' + response.code);

      const params = {
        'client_id': import.meta.env.VITE_GOOGLE_CLIENT_ID,
        'client_secret': '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',
        'code': response.code,
        'grant_type': 'authorization_code',
        'redirect_uri': 'http://localhost:5173'
      }
      const qs = new URLSearchParams(params).toString();
      console.log('qs', qs)
      const tokenURL =  `https://oauth2.googleapis.com/token?${qs.toString()}`
      console.log('tokenURL', tokenURL)
      axios.post(tokenURL).then(res => {
        console.log('access toekn', res)
      })

    }
  })

  //  const getAcessToken = async () => {
  //     const url = getTokenURL()
  //     axios.get(
  //       `https://oauth2.googleapis.com/tokeninfo?access_token=${client.getAccessToken()}`,
  //     ).then(res => {
  //       console.log('tokeninfo', res)
  //     })
  //     )
  //   }

  return (
    <button onClick={() => client.requestCode()}>Authorize with Google</button>


  )
}