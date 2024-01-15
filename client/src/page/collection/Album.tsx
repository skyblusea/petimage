import styled from "@emotion/styled"
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import SquareImgBoxWIcon from "../../components/Boxes";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { AlbumItem } from "../../types";

export default function Album({ data }: { data: AlbumItem}) {
  console.log('data', data)
  return (
    <AlbumContainer>
      <AlbumHeader>
        <Typography variant="subtitle1">{new Intl.DateTimeFormat(undefined, {dateStyle:'medium'}).format(new Date(data.createdAt))}</Typography>
        <DownloadIcon fontSize="large" />
      </AlbumHeader>
      <AccordionBox>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon fontSize="large" color="petimage" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4" color="petimage.main">컨셉사진 / 우주비행사 / 30장</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={1}>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
            <Grid xs={12/5}>
              <SquareImgBoxWIcon src="/dog.jpeg" alt="dog"></SquareImgBoxWIcon>
            </Grid>
          </Grid>
        </AccordionDetails>
      </AccordionBox>
    </AlbumContainer>
  )
}



const AlbumContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const AlbumHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AccordionBox = styled(Accordion)`
  box-shadow: none;
  border: 2px solid var(--petimage);
  border-radius: var(--border-radius-sm) !important;
  :before {
    display: none;
  }
`