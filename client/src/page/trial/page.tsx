import { Button } from "@mui/material";
import { useState } from "react";
import { Form, useActionData, useSubmit } from "react-router-dom";



export default function Trial() {

  interface FileWithUrl {
    file: File,
    imgUrl: string
  }

  const [files, setFiles] = useState<FileWithUrl[]>([])


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFile(e.target.files)
    // reset for triggering onChange on a same file 
    // 같은 파일 선택시 onChange가 발생하지 않는 문제 해결
    e.target.value = ''
  }

  const readFile = async (fileList: FileList) => {
    const selectedFiles = [...fileList]

    const isMax = files.length + selectedFiles.length > 12
    if (isMax) {
      alert("이미지는 12개까지만 추가할 수 있습니다.")
    }
    selectedFiles.splice(12 - files.length)
    const results = await Promise.allSettled(selectedFiles.map(file => getBase64(file)))
    const fulfilled = results.filter(result => result.status === 'fulfilled') as PromiseFulfilledResult<FileWithUrl>[]
    if (fulfilled.length) {
      setFiles([...files, ...fulfilled.map(result => result.value)])
    }
    const rejected = results.filter(result => result.status === 'rejected') as PromiseRejectedResult[]
    if (rejected.length) {
      alert(rejected[0].reason)
    }
  }
  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const imgUrl = reader.result as string
        const isExist = files.some(file => file.imgUrl === imgUrl)
        if (isExist) {
          reject('이미 존재하는 파일입니다.')
        } else {
          const result = { file, imgUrl }
          resolve(result as FileWithUrl)
        }
      }
      reader.onerror = (error) => reject(error)
    })
  }

  const packFiles = () => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file.file)
    })
    return formData.getAll('files')
  }


  // const uploadHandler = async (e) => {
  //   e.preventDefault();

  //   // const filePack = packFiles()
  //   console.log(e.currentTarget)
  //   const formData = new FormData(e.currentTarget)
  //   files.forEach(file => {
  //     formData.append('aaa', file.file)
  //   })

  //   try {
  //     const response = await authClient.post('/file/upload?filePath=', formData);
  //     console.log(response.data);
  //     // handle successful response
  //   } catch (error) {
  //     console.error(error);
  //     // handle error response
  //   }
  // }

  const submit = useSubmit()
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    files.forEach(file => {
      formData.append('b', file.file)
    })
    submit(formData, { method: 'post' })
  }
  const clickHandler = async (e) => {
    const formData = new FormData()
    files.forEach(file => {
      formData.append('b', file.file)
    })
    submit(formData, { method: 'post' })
  }




  return (
    <Form method="post" onSubmit={submitHandler}>
      <input
        id="file-input"
        type="file"
        name="file"
        accept="image/*"
        multiple
        onChange={onChangeHandler} />
      <input type="text" name="a" value="fefe" readOnly />
      <Button
        onClick={clickHandler}
      >onclick버튼</Button>
      <Button
        type="submit"
      >submit버튼</Button>
    </Form>
  )
}


