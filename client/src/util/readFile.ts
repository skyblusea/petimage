import { FileWithUrl } from "../types";


export const readFile = async (fileList: FileList, state : FileWithUrl[], setState : React.Dispatch<React.SetStateAction<FileWithUrl[]>>) => {
  const selectedFiles = [...fileList]


  const isMax = state.length + selectedFiles.length > 12
  if (isMax) {
    alert("이미지는 12개까지만 추가할 수 있습니다.")
  }

  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgUrl = reader.result as string
        const isExist = state.some(file => file.imgUrl === imgUrl)
        if (isExist) {
          reject('이미 존재하는 파일입니다.')
        } else {
          const result = { file, imgUrl, isValid: true }
          resolve(result as FileWithUrl)
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }
  

  selectedFiles.splice(12 - state.length)
  const results = await Promise.allSettled(selectedFiles.map(file => getBase64(file)))
  const fulfilled = results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<FileWithUrl>[]
  if (fulfilled.length) {
    setState([...state, ...fulfilled.map(result => result.value)])
  }
  const rejected = results.filter(result => result.status === 'rejected') as PromiseRejectedResult[]
  if (rejected.length) {
    alert(rejected[0].reason)
  }
}

