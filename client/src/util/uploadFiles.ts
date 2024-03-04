import { AxiosInstance } from "axios";

export const uploadFiles = async (formData:FormData, authClient:AxiosInstance) => {
  try {
    const res = await authClient.post("/file/upload?filePath=", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(res.status === 200) {
      const { data : { ok, data} } = res;
      if(ok) {
        return data;
      }
    }
  }catch (error) {
    console.error(error);
    return
  }
};
