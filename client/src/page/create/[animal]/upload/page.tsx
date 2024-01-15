import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Form, useParams, useSubmit } from "react-router-dom";
import { useState } from "react"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GuideLine from "./GuideLine";
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";



export default function Upload() {

  const { animal, breed } = useParams() as { animal: string, breed: string }

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


  const onDragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }
  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const fileList = e.dataTransfer.files;
    if (fileList) readFile(fileList);
  }

  const submit = useSubmit()
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submit triggered')
    const formData = new FormData(e.currentTarget)
    files.forEach(file => {
      formData.append('files', file.file)
    })
    submit(formData)
  }
  const clickHandler = (e) => {
    console.log('onclick triggered')
    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file.file)
    })
    submit(formData)
  }

  return (
    <Form method="post" onSubmit={submitHandler} action="/test">
      <Grid container spacing={3}>
        <Grid xs={6} display={!files.length ? 'flex' : 'none'}>
          <GuideLine />
        </Grid>
        <Grid xs={!files.length ? 6 : 12} >
          <DragNDropBox>
            {!files.length &&
              <>
                <div>
                  <CloudUploadIcon />
                  <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>드래그로 파일 첨부하기</Typography>
                </div>
                <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>또는</Typography>
                <Button
                  htmlFor="file-input"
                  role="button"
                  component="label"
                  variant="contained"
                >
                  파일 선택
                </Button>
              </>
            }

            <input
              id="file-input"
              type="file"
              name="file"
              accept="image/*"
              hidden
              multiple
              onChange={onChangeHandler} />
            <input type="text" name="animal" value={animal} hidden readOnly />
            <input type="text" name="breed" value={breed} hidden readOnly />
          <Grid container spacing={1} sx={{ width: '100%' }}>
            {/* <TransitionGroup component={null}> */}
            {files.map((file) => (
              <Grid key={file.imgUrl} xs={2} >
                <AlbumItemWrapper>
                  <AlbumItem $src={file.imgUrl} />
                  <IconButton
                    onClick={() => {
                      const filtered = files.filter(f => f.imgUrl !== file.imgUrl)
                      setFiles(filtered)
                    }}
                    aria-label="delete" size="small">
                    <DeleteIcon />
                  </IconButton>
                </AlbumItemWrapper>
              </Grid>
            ))}
            {(0 < files.length && files.length < 12)
              &&
              <Grid xs={2} display="flex">
                <Button
                  htmlFor="file-input"
                  role="button"
                  component="label"
                  variant="outlined"
                  sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                  <AddRoundedIcon fontSize="large" /> 추가하기
                </Button>
              </Grid>
            }
            {/* </TransitionGroup> */}
          </Grid>
        </DragNDropBox>
      </Grid>
      <Grid xs={12}>
        <Button
          // disabled={files.length < 10 || files.length > 12}
          color="petimage"
          variant="contained"
          type="submit"
        >submit 생성하기</Button>
        <Button
          // disabled={files.length < 10 || files.length > 12}
          onClick={clickHandler}
          color="petimage"
          variant="contained"
        >onClick 생성하기</Button>

        {/* <LinkButton
          to={`/create/${animal}/${breed}/checkout`}
          disabled={files.length < 10 || files.length > 12}
          color="petimage"
          variant="contained"
          sx={{ width: '100%' }}
        >
          이미지 생성하기
        </LinkButton> */}
      </Grid>
    </Grid >
    </Form >

  )
}



const AlbumItemWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  button {
    position: absolute;
    top: 2px;
    left: 2px;
  }
`
interface AlbumItemProps {
  $src: string;
}

export const AlbumItem = styled.div<AlbumItemProps>`
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius-lg);
  background-position: center;
  background-image: ${props => `url(${props.$src})` || "none"};;
  background-size: cover;
`



const DragNDropBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: var(--gap-md);
  height: 100%;
  padding: var(--gap-lg);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  border: 2px dashed var(--primary);
  form {
    display: none;
  }
`

