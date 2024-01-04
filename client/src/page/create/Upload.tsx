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

export default function Upload() {

  const [files, setFiles] = useState<File[]>([])
  const [imgUrls, setImgUrls] = useState<string[]>([]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) readFile(fileList);
  }

  const readFile = (fileList: FileList) => {
    const selectedFiles = [...fileList]
    setFiles([...files, ...selectedFiles]);
    Promise.all(selectedFiles.map(file => getBase64(file)))
      .then((results) => {
        const isExist = results.some(result => imgUrls.includes(result))
        if (isExist) {
          alert("이미 추가된 이미지 입니다.")
        }
        const filteredResults = results.filter(result => !imgUrls.includes(result))
        setImgUrls([...imgUrls, ...filteredResults])
      })
  }

  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string)
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

  // const [checked, setChecked] = useState(true);

  return (
    <Grid container spacing={3}>
      {/* <Grid xs={12}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={() => setChecked(!checked)} />}
          label="Show"
        />
      </Grid> */}
        <Grid xs={5} display={!imgUrls.length ?'flex' :'none'}>
          <GuideLine />
        </Grid>
        <Grid xs={!imgUrls.length ? 7 : 12} display="flex">
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
            <Album>
              <TransitionGroup component={null}>
                {imgUrls.map((url, index) => (
                  <Collapse key={index} orientation="horizontal"><AlbumItem $src={url} /></Collapse>
                ))}
              </TransitionGroup>
              {(0 < imgUrls.length && imgUrls.length < 12)
                &&
                <>
                  <Button
                    htmlFor="file-input"
                    role="button"
                    component="label"
                    variant="outlined"
                    sx={{ aspectRatio: '1/1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <AddRoundedIcon fontSize="large" />
                    추가 파일 업로드
                  </Button>
                </>
              }
            </Album>
          </DragNDropBox>
        </Grid>
    </Grid >
  )
}


const Album = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

interface AlbumItemProps {
  $src: string;
}

const AlbumItem = styled.div<AlbumItemProps>`
  width: 100px;
  height: 100px;
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
`

