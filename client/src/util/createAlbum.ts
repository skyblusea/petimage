import { Theme } from "../types";
import { authClient } from "./axiosInstance";

export const createAlbum = async (theme:Theme, animalCode:string, uploaded:string[]) => {
  try {
    const data = {
      themeId : theme,
      inputFiles : uploaded,
      animalCode,
    }
    const res = await authClient.post("/album/new",data)
    if(res.status === 200) {
      console.log(res);
      const { data : { ok } } = res;
      if(ok) {
        return true;
      }
    }
    return false;
  }catch (error) {
    console.log(error);
    return false;
  }
};
