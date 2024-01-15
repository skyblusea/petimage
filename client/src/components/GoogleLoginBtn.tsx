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

//로그인 작동원리
//AuthProvider.tsx 에서 google api client 실행
//google api client가 로그인 버튼을 렌더링
//로그인 버튼 클릭시 google api client가 로그인 팝업을 띄움
//로그인 이후 signInWithGoogle 콜백 실행