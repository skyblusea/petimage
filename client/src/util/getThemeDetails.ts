import { apiClient } from "./axiosInstance";

export const getThemeDetails = async (themeId:FormDataEntryValue) => {
  try {
    const res = await apiClient.get(`/theme/${themeId}`)
    if(res.status === 200) {
      const { data : { ok, data} } = res;
      if(ok) {
        const theme = {
          id: themeId,
          name: data.name,
          price: data.price,
        }
        return theme;
      }else {
        throw new Error("테마 정보를 불러오는데 실패했습니다.");
      }
    }
  }catch (error) {
    console.log(error);
    throw error;
  }
}