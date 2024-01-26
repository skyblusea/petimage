import { LoadingContextType } from "../provider/LoadingProvider";
import { FileWithUrl } from "../types";
import { nanoid } from "nanoid";


export const readFile = async (fileList: FileList, state : FileWithUrl[], setState : React.Dispatch<React.SetStateAction<FileWithUrl[]>>, setIsLoading:LoadingContextType['setIsLoading']) => {
  const selectedFiles = [...fileList]

  //이미지가 12개 초과하면 원본배열 자르기
  const isMax = state.length + selectedFiles.length > 12
  if (isMax) {
    alert("이미지는 12개까지만 추가할 수 있습니다.")
  }
  selectedFiles.splice(12 - state.length)

  //병렬처리
  setIsLoading(true)
  const results = await Promise.allSettled(selectedFiles.map((file,idx) => getBase64(file, state, idx)))
  const fulfilled = results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<FileWithUrl>[]
  if (fulfilled.length) {
    setState([...state, ...fulfilled.map(result => result.value)])
  }
  const rejected = results.filter(result => result.status === 'rejected') as PromiseRejectedResult[]
  if (rejected.length) {
    alert(rejected[0].reason)
  }
  setIsLoading(false)
}

const getBase64 = (file: File, packedFile:  FileWithUrl[], idx:number) => {
  console.log(idx,'번째 파일 getBase64 start')
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrl = reader.result as string
      const isExist = packedFile.some(file => file.imgUrl === imgUrl)
      if (isExist) {
        reject('이미 존재하는 파일입니다.')
      } else {
        console.log(idx,'번째 파일 getBase64 resolve')
        const result = { id: nanoid() ,file, imgUrl, isValid: true }
        resolve(result as FileWithUrl)
      }
    }
    reader.onerror = (error) => reject(error)
  })
}