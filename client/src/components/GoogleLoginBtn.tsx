import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import { getGoogleLoginUrl } from "../util/login";
import { AuthContext } from "../context/AuthProvider";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    const renderGoogleLoginBtn = () => {
      if(!divRef.current) return
      google.accounts.id.renderButton(divRef.current, {
        type: "standard",
        theme: "filled_blue",
        size: "large",
        width: divRef.current.clientWidth,
      })
    }

    renderGoogleLoginBtn()
  }, [])

  return (
    <div ref={divRef}></div>
  )
}