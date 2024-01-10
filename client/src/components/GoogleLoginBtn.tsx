import { useEffect, useRef } from "react";

export default function GoogleLoginBtn() {

  const divRef = useRef<HTMLDivElement>(null);

  //Component Reusability, Conditional Rendering, Separation of Concerns의 이유로 코드 분리
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