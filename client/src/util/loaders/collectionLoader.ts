import axios from "axios";

import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { useAuthContext } from "../useAuthContext";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

export const usePayment = async () => {
  console.log("usePayment 실행");

  const { token } = useAuthContext();
  console.log("token", token);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/payment/list?sort=&order=&limit=&page=`, { headers });
    console.log("결제내역 !!!", res);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // axios에서 발생한 error
      if (error.response) {
        // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
        // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
        // node.js에서는 http.ClientRequest 인스턴스입니다.
        console.log("server error", error.request);
      } else {
        // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
        console.log("Error", error.message);
      }
      //! 서버 에러시 더미 데이터 반환 !! 나중에 삭제
      return;
    }
  }
};

export const userQuery = () => ({
  queryKey: ["payment"],
  queryFn: usePayment,
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});

export const collectionLoader = (queryClient: QueryClient) => async () => {
  const query = userQuery();
  // const context = useContext(AuthContext);
  // source of truth -> Context.Provider -> useContext -> hook -> component
  //      |
  //      |-> loader()
  console.log("context", context)
  const isAuthenticated = false;

  console.log("collectionLoader 실행", isAuthenticated)

  //비로그인 시 홈으로 리다이렉트
  if (!isAuthenticated) return redirect("/");
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));

  return data;
};
