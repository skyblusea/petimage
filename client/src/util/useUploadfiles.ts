import { authClient } from "./axiosInstance";

export const useUploadfiles = async (files) => {

  authClient.post(`/file/upload?filePath=`, files)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    if (err.response) {
      // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
      console.error(err.response.data);
      console.error(err.response.status);
      console.error(err.response.headers);
    } else if (err.request) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
      console.error('server error',err.request);
    } else {
      // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
      console.error('Error', err.message);
    }
  })
}