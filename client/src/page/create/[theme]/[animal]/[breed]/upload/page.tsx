import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GuideLine from "./GuideLine";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from "@mui/material";
import { uploadFiles } from "../../../../../../util/uploadFiles";
import { validateFiles } from "../../../../../../util/validateFiles";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { LoadingContext } from "../../../../../../provider/LoadingProvider";




export default function Upload() {

  const { theme, animal, breed } = useParams()
  const animalKor = animal==='dog' ? '강아지' : '고양이'  
  const { setIsLoading } = useContext(LoadingContext)
  const navigate = useNavigate()


  interface FileWithUrl {
    file: File,
    imgUrl: string,
    isValid?: boolean
  }
  const [files, setFiles] = useState<FileWithUrl[]>([])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFile(e.target.files)
    // reset for triggering onChange on a same file, 같은 파일 선택시 onChange가 발생하지 않는 문제 해결
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
          const result = { file, imgUrl, isValid: true }
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


  const onClickHandler = async () => {
    console.log('click triggered')
    const formData = new FormData()
    files.forEach(file => {
      formData.append('file', file.file)
    })
    setIsLoading(true)
    const uploaded = await uploadFiles(formData)
    const validated = await validateFiles(uploaded, animalKor) as { check: boolean, url: string }[]
    const isAllValid = validated.every(ele => ele.check)
    setIsLoading(false)
    if (!isAllValid) {
      alert('유효하지 않은 파일이 존재합니다.')
      const validationResult = files.map((ele, idx) => {
        return { ...ele, isValid: validated[idx].check }
      })
      setFiles(validationResult)
    }else {
      navigate(`/create/${theme}/${animal}/${breed}/checkout`, { state: { files: uploaded } })
    }
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
              accept="image/*"
              hidden
              multiple
              onChange={onChangeHandler} />
            <Grid container spacing={1} sx={{ width: '100%' }}>
              {files.map((file) => (
                <Grid key={file.imgUrl} xs={2}>
                  <AlbumItemWrapper>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 'var(--border-radius-lg)',
                        backgroundPosition: 'center',
                        backgroundImage: `url(${file.imgUrl})` || "none",
                        backgroundSize: 'cover',
                        border: `${file.isValid ? 'none' : '2px solid'}`,
                        borderColor: `${file.isValid ? 'none' : 'error.main'}`
                      }} />
                    <IconButton
                      onClick={() => {
                        const filtered = files.filter(f => f.imgUrl !== file.imgUrl)
                        setFiles(filtered)
                      }}
                      aria-label="delete" size="small">
                      <DeleteIcon />
                    </IconButton>
                    {!file.isValid && <HighlightOffRoundedIcon fontSize="medium" color="error" />}
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
                    sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1' }}
                  >
                    <AddRoundedIcon fontSize="large" />
                  </Button>
                </Grid>
              }
            </Grid>
          </DragNDropBox>
        </Grid>
        <Grid xs={12}>
          <Button
            // disabled={files.length < 10 || files.length > 12}
            color="petimage"
            variant="contained"
            onClick={onClickHandler}
            sx={{ width: '100%' }}
          >submit 생성하기</Button>
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
  > button {
    position: absolute;
    top: 2px;
    left: 2px;
  }
  > svg {
    position: absolute;
    bottom: 4px;
    right: 4px;
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

