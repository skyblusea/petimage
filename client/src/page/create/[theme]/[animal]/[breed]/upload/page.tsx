import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import CloudUploadIcon from '../../../../../../assets/upload-cloud.svg?react';
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useContext, useState } from "react"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import GuideLine from "./GuideLine";
import DeleteIcon from '../../../../../../assets/delete.svg?react';
import { Box, IconButton, SvgIcon } from "@mui/material";
import { uploadFiles } from "../../../../../../util/uploadFiles";
import { validateFiles } from "../../../../../../util/validateFiles";
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { LoadingContext } from "../../../../../../provider/LoadingProvider";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { AlbumDetails } from "../../../../../../types";
import { FileWithUrl } from "../../../../../../types";
import { readFile } from "../../../../../../util/readFile";
import useAuth from "../../../../../../util/useAuth";


export default function Upload() {
  const navigate = useNavigate()
  const { setIsLoading } = useContext(LoadingContext)
  const { breed, animal } = useParams()
  const { authClient } = useAuth()

  //상품정보 잘 안바뀌므로 QueryData 사용 or Action 통해 api 호출(이 방법 사용시 상태XX Context setting 필요)
  const themeData = useRouteLoaderData('createWithTheme') as AlbumDetails['theme']
  const animalKor = animal === 'dog' ? '강아지' : '고양이'

  //Handling InputFile for Preview
  const [files, setFiles] = useState<FileWithUrl[]>([])

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) readFile(e.target.files, files, setFiles, setIsLoading)
    // reset for triggering onChange on a same file, 같은 파일 선택시 onChange가 발생하지 않는 문제 해결
    e.target.value = ''
  }


  //Drag & Drop
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
    if (fileList) readFile(fileList, files, setFiles, setIsLoading);
  }

  //Submit
  const submitHandler = async () => {
    //서버에 이미지 업로드 후 url 받아오기
    const formData = new FormData()
    files.forEach(file => { formData.append('file', file.file) })
    //로딩 lottie trigger
    setIsLoading(true)
    const uploaded = await uploadFiles(formData, authClient)
    //서버에 유효성 검사
    const validated = await validateFiles(uploaded, animalKor, authClient) as { check: boolean, url: string }[]
    const isAllValid = validated.every(ele => ele.check)
    if (!isAllValid) {
      //유효성 검사 결과 표시 위해 state 변경
      const validationResult = files.map((ele, idx) => {
        return { ...ele, isValid: validated[idx].check }
      })
      setFiles(validationResult)
      setIsLoading(false)
      alert('유효하지 않은 파일이 존재합니다.')
    } else {
      //유효성 검사 모두 통과하면 결제 페이지로 이동
      setIsLoading(false)
      navigate('/checkout', { state: { theme: themeData, animalCode: breed, inputFiles: uploaded } })
    }
  }


  return (
    <Grid container spacing={3}>
      <Grid xs={6} display={!files.length ? 'flex' : 'none'}>
        <GuideLine />
      </Grid>
      <Grid xs={!files.length ? 6 : 12} >
        <DragNDropBox
          onDragEnter={onDragEnterHandler}
          onDragLeave={onDragLeaveHandler}
          onDragOver={onDragOverHandler}
          onDrop={onDropHandler}
        >
          {!files.length &&
            <>
              <div>
                <CloudUploadIcon />
                <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>드래그로 파일 첨부하기</Typography>
                <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>또는</Typography>
              </div>
              <Button
                sx={{ width: '40%' }}
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
              <Grid key={file.id} xs={2}>
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
                      const filtered = files.filter(f => f.id !== file.id)
                      setFiles(filtered)
                    }}
                    color="inherit"
                    sx={{ color: "#bbb" }}
                    aria-label="delete" size="small">
                    <SvgIcon component={DeleteIcon} inheritViewBox />
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
                  sx={{ 
                    borderRadius: 'var(--border-radius-lg)',
                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', aspectRatio: '1/1' }}
                >
                  <AddRoundedIcon fontSize="large" />
                </Button>
              </Grid>
            }
          </Grid>
        </DragNDropBox>
      </Grid>
      {(0 < files.length)
        &&
        <Grid xs={12} display="flex" justifyContent="end" >
          <Button
            disabled={files.length < 10 || files.length > 12}
            endIcon={<ArrowForwardRoundedIcon />}
            color="petimage"
            variant="contained"
            onClick={submitHandler}
            sx={{ width: '100%' }}
          >이미지 생성하기</Button>
        </Grid>}
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

