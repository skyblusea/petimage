
import Paper from '@mui/material/Paper';

import Typography from "@mui/material/Typography";
import styled from '@emotion/styled'
import Grid from '@mui/material/Unstable_Grid2';
import SquareImgBox from '../../components/Boxes';



export default function GuideLine() {
  const correct = new Array(6).fill({ 'id': 0, 'name': '흐린 사진', 'img': '/dog.jpeg' });
  const wrong = new Array(6).fill({ 'id': 0, 'name': '올바른 사진', 'img': '/dog.jpeg' });

  return (
    <Paper sx={{ display: 'flex', flex: '1', flexDirection: 'column', alignItems: 'center', borderRadius: 'var(--border-radius-lg)', padding: 'var(--pd-md)' }}>
      <GuideBox title="잘못된 사진" guide={correct} />
      <GuideBox title="올바른 사진" guide={wrong} />
    </Paper>
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
        <Typography component="span" variant="subtitle3" color={props.title === "올바른 사진" ? 'success.main' : 'error.main'} sx={{ fontWeight: '600', marginTop: 'var(--pd-md)' }}>{props.title}</Typography>
      </Grid>
      {guide.map((ele, index) => {
        return (
          <Grid xs={4} key={index}>
            <SquareImgBox src={ele.img} success={props.title === "올바른 사진" ? true : false} error={props.title === "올바른 사진" ? false : true}>
              {ele.name}
            </SquareImgBox>
          </Grid>
        )
      })}
    </Grid>
  )
}


export const ImgWrraper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: var(--border-radius-lg);
  svg {
    position: absolute;
    bottom: 4px;
    right: 4px;
  }
`