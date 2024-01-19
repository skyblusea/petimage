import { authClient } from "./axiosInstance";

export const uploadFiles = async (formData:FormData) => {
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
      }else {
        throw new Error("파일 업로드에 실패했습니다.");
      }
    }
  }catch (error) {
    console.log(error);
    throw error;
  }
};
