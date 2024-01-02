import Typography from "@mui/material/Typography";
import { SquareCreateBox } from "./Grids";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import styled from '@emotion/styled'
import Button from '@mui/material/Button';
import UploadIcon from '../../assets/upload-cloud.svg?react';

// import { Box, Button } from "@mui/material";
// import { width } from "@mui/system";


export default function Upload() {

  const correct = new Array(6).fill({ 'id': 0, 'name': '흐린 사진', 'img': '/dog.jpeg' });
  const wrong = new Array(6).fill({ 'id': 0, 'name': '올바른 사진', 'img': '/dog.jpeg' });


  return (
    <Grid container spacing={3}>
      <Grid xs={5} alignItems="center">
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', padding:'var(--pd-md)' }}>
          <GuideBox title="잘못된 사진" guide={correct} />
          <GuideBox title="올바른 사진" guide={wrong} />
        </Paper>
      </Grid>
      <Grid xs={7}>
        <DragNDropBox>
          <div>
            <UploadIcon />
            <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>드래그로 파일 첨부하기</Typography>
          </div>
          <Typography component="p" variant="body1" color="primary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>또는</Typography>
          <Button variant="contained">파일 선택</Button>
        </DragNDropBox>
      </Grid>
    </Grid>
  )
}





interface Guide {
  id: number;
  name: string;
  img: string;
}

interface GuideBoxProps {
  title: string;
  guide: Guide[];
}

function GuideBox(props: GuideBoxProps) {
  const guide = props.guide;
  return (
    <Grid container xs={12} spacing={1}>
      <Grid xs={12} display="flex">
        <Typography component="span" variant="subtitle3" color={props.title==="올바른 사진" ?'success.main' :'error.main' } sx={{ fontWeight: '600', marginTop:'var(--pd-md)' }}>{props.title}</Typography>
      </Grid>
      {guide.map((ele, index) => {
        return (
          <Grid xs={4}>
            <SquareCreateBox>
              <img src={ele.img} alt="강아지" key={index} />
              <HighlightOffRoundedIcon fontSize="small" color="error" sx={{ position: 'absolute', bottom: 'var(--pd-xs)', right: 'var(--pd-xs)' }} />
              {ele.name}
              {/* <Typography component="span" variant="body1" color="secondary" sx={{ typography: { xs: 'body3', lg: 'body1' } }}>흐린 사진</Typography> */}
            </SquareCreateBox>
          </Grid>
        )
      })}
    </Grid>
  )
}



const DragNDropBox = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  gap: var(--gap-md);
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius-lg);
  border: 2px dashed var(--white);
`
