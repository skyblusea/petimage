import axios from "axios";

const tokenRefresh = async (token:{access:string|undefined,refresh:string|undefined}) => {
  console.log('tokenRefresh',token)
  axios
    .get(`${import.meta.env.VITE_URL}/user/refresh`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
        refresh: token.refresh,
      },
    })
    .then((res) => {
      console.log('발급 성공!')
      const { access, refresh } = res.data.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
    })
    .catch((err) => {
      console.log('발급 실패!')
      if (err.response.status === 401) {
        alert("로그인이 만료되었습니다.");
      }
    });
}


export default tokenRefresh;

//authProvider에 포함시키면 axios Intercepter를 사용할 수 없다.
//react hoow cannot be used in axios intercepter