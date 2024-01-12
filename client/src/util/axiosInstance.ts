import axios from "axios";
import tokenRefresh from "./tokenRefresh";

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
      // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
      // node.js에서는 http.ClientRequest 인스턴스입니다.
      console.log('server error',error.request);
    } else {
      // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
      console.log('Error', error.message);
    }
    return Promise.reject(error);
  }
);


export const authClient = axios.create({
  baseURL: `${import.meta.env.VITE_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
});

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    const errorMsg = error.response.data.data;
    switch (error.response.status) {
      case 401:
        console.error("refresh token error | ",errorMsg);
        break;
      case 403: {
        console.error("access token error | ",errorMsg);
        tokenRefresh();
        break;
      }
      default:
        return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);


