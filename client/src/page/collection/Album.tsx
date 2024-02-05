import styled from "@emotion/styled"
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import SvgIcon from '@mui/material/SvgIcon';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Backdrop from '@mui/material/Backdrop';
import ExpandMoreRoundedIcon from '../../assets/arrow.svg?react';
import { AlbumItem } from "../../types";
import BaseImgBox from "../../components/Boxes";
import { IconButton } from "@mui/material";
import JSZip from 'jszip'
import { saveAs } from "file-saver";
import { useCallback, useState } from "react";
import CloseIcon from '../../assets/close.svg?react';
import DownloadIcon from '../../assets/download.svg?react';
import ZoomOutIcon from '../../assets/zoom-out.svg?react';
import { isMobile } from "react-device-detect";

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
  }, [data._id])

  const downloadSinglefile = useCallback(async (url: string) => {
    const img = await fetch(url).then(res => res.blob())
    saveAs(img, url.split('/').pop());
  }, [])

  return (
    <AlbumContainer>
      <AlbumHeader>
        <Typography variant="subtitle1" sx={{ fontSize: '18px' }}>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(data.createdAt))}</Typography>
        <IconButton aria-label="download" onClick={downloadFile} >
          <SvgIcon component={DownloadIcon} />
        </IconButton>
      </AlbumHeader>
      <AccordionBox TransitionProps={{ unmountOnExit: true }} disabled={!data.status} >
        <AccordionSummary
          expandIcon={<SvgIcon component={ExpandMoreRoundedIcon} inheritViewBox sx={{ transform: 'rotate(90deg)' }} fontSize="large" color="petimage" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" color="petimage.main">{data.themeName}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {data.outputFiles.map((file, idx) =>
              <Grid key={idx} xs={12 / 5}>
                <BaseImgBox view hover square src={file} alt="dog" onClick={() => setOpen(idx)}></BaseImgBox>
                {open === idx &&
                  //이미지 미리보기
                  <Backdrop open={open === idx} onClick={() => setOpen(undefined)} sx={{ 
                    zIndex: 100, cursor: "zoom-out" }}>
                  {/* <Backdrop2> */}
                    <ImgWrraper>
                      <img src={file} alt="dog" />
                      <IconButton sx={{ 
                        position: 'absolute', left: '24px', top: '8px' }} onClick={() => downloadSinglefile(file)} >
                        <SvgIcon component={DownloadIcon} />
                      </IconButton>
                      <IconButton sx={{ position: 'absolute', right: '24px', top: '8px' }} onClick={() => setOpen(undefined)}>
                        <SvgIcon component={CloseIcon} />
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
  padding: 0 16px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 100%;
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`