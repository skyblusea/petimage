import { AxiosInstance } from "axios";

export const validateFiles = async (
  uploaded: string[],
  animal: '강아지' | '고양이',
  authClient: AxiosInstance
) => {
  try {
    const data = {
      inputFiles : uploaded,
      class : animal
    }
    const res = await authClient.post("/album/check",data)
    if(res.status === 200) {
      const { data : { ok, data} } = res;
      if(ok) {
        return data;
      }
    }
  }catch (error) {
    console.log(error);
    throw error;
  }
};
