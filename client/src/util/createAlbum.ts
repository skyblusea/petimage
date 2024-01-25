import { AxiosInstance } from "axios";

export const createAlbum = async (albumDetails:any, token:string|null, authClient:AxiosInstance) => {
  try {
    console.log('createAlbum 실행중', token)
    console.log('albumDetails', albumDetails)
    const res = await authClient.post("/album/new",{
      themeId : albumDetails.theme.themeId,
      animalCode : albumDetails.animalCode,
      inputFiles : albumDetails.inputFiles
    },
  )
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
