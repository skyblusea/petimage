import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useAuth from "../util/useAuth";

export default function GoogleLoginBtn() {
  const { signInWithGoogle } = useAuth();
  const divRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  //modal이라 clientWidth 잘못 계산되는 문제 해결

  //Component Reusability, Conditional Rendering, Separation of Concerns의 이유로 코드 분리
  useEffect(() => {
    setIsMounted(true);
    if (!divRef.current) return;

    // Initialize Google API client
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: signInWithGoogle
    });

    // Render the Google login button
    if (isMounted) {
      google.accounts.id.renderButton(divRef.current, {
        type: "standard",
        theme: "filled_blue",
        size: "large",
        width: divRef.current.clientWidth,
      });
    }

  }, [isMounted]);

  useEffect(() => {
  }, [divRef.current])

  return (
    <div ref={divRef}></div>
  )
}

//로그인 작동원리
//AuthProvider.tsx 에서 google api client 실행
//google api client가 로그인 버튼을 렌더링
//로그인 버튼 클릭시 google api client가 로그인 팝업을 띄움
//로그인 이후 signInWithGoogle 콜백 실행