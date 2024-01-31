import styled from "@emotion/styled"
import DownloadIcon from '@mui/icons-material/Download';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Backdrop from '@mui/material/Backdrop';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { AlbumItem } from "../../types";
import BaseImgBox from "../../components/Boxes";
import { IconButton } from "@mui/material";
import JSZip from 'jszip'
import { saveAs } from "file-saver";
import { useCallback, useState } from "react";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
export default function Album({ data }: { data: AlbumItem }) {
  //TODO : rendering delay
  const [open, setOpen] = useState<number | undefined>()

  const downloadFile = useCallback(async () => {
    const name = `petimage_${data.themeName}_${data.createdAt.slice(0, 10)}`
    const zip = new JSZip()
    const imagesFolder = zip.folder(name)
    const imgFetcher = await Promise.all(data.outputFiles.map((url) => fetch(url).then(res => res.blob())))
    imgFetcher.forEach((blob, idx) => {
      imagesFolder?.file(`${data.themeName}${idx}.png`, blob)
    })
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, `${name}.zip`);
    });
  }, [])


  return (
    <AlbumContainer>
      <AlbumHeader>
        <Typography variant="subtitle1">{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(data.createdAt))}</Typography>
        <IconButton aria-label="download" onClick={downloadFile} >
          <DownloadIcon fontSize="large" />
        </IconButton>
      </AlbumHeader>
      <AccordionBox TransitionProps={{ unmountOnExit: true }} disabled={!data.status} >
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon fontSize="large" color="petimage" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h4" color="petimage.main">컨셉사진 / {data.themeName} / {data.outputFiles.length}장</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {data.outputFiles.map((file, idx) =>
              <Grid key={idx} xs={12 / 5}>
                <BaseImgBox view hover square src={file} alt="dog" onClick={() => setOpen(idx)}></BaseImgBox>
                {open === idx &&
                  <Backdrop open={open === idx} onClick={() => setOpen(undefined)} sx={{ zIndex: 100, cursor: "zoom-out" }}>
                    <ImgWrraper>
                      <img src={file} alt="dog" />
                      <IconButton sx={{ position: 'absolute', right: 0, top: 0 }} onClick={() => setOpen(undefined)}>
                        <CloseFullscreenIcon color="secondary" />
                      </IconButton>
                    </ImgWrraper>
                  </Backdrop>}
              </Grid>
            )}
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

const ImgWrraper = styled.div`
  position: relative;
  margin: auto;
`