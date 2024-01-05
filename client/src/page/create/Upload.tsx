import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import UploadIcon from '../../assets/upload-cloud.svg?react';
import { Form } from "react-router-dom";
import { useState } from "react";
import { TransitionGroup } from 'react-transition-group';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GuideLine from "./GuideLine";
import { ImgWrraper } from "../../components/Boxes";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";

export default function Upload() {
  interface FileWithUrl {
    file: File,
    imgUrl: string
  }

  const [files, setFiles] = useState<FileWithUrl[]>([])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFile(e.target.files)
    // reset for triggering onChange on a same file
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
    const rejected = results.filter(result => result.status === 'rejected') as PromiseRejectedResult[]
    if (rejected.length) {
      alert(rejected[0].reason)
    }
  }
  console.log('files', files)
  const getBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      console.log('file', file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const isExist = files.some(file => file.imgUrl === reader.result)
        if (isExist) {
          console.log('이미 존재')
          reject('이미 존재하는 파일입니다.')
        }else {
          console.log('추가 됨')
          const result = {
            file,
            imgUrl: reader.result as string
          }
          setFiles([...files, result])
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


  return (
    <Grid container spacing={3}>
      <Grid xs={6} display={!files.length ? 'flex' : 'none'}>
        <GuideLine />
      </Grid>
      <Grid xs={!files.length ? 6 : 12} >
        <DragNDropBox>
          {!files.length &&
            <>
              <div>
                <UploadIcon />
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
          <Form>
            <input
              id="file-input"
              type="file"
              name="file"
              accept="image/*"
              hidden
              multiple
              onChange={onChangeHandler} />
          </Form>

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
          disabled={files.length < 10 || files.length > 12}
          color="petimage"
          variant="contained"
          sx={{ width: '100%' }}
        >
          이미지 생성하기
        </Button>
      </Grid>
    </Grid >
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
const AlbumItem = styled.div<AlbumItemProps>`
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

