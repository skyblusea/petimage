import styled from "@emotion/styled"
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Zoom from '@mui/material/Zoom';
import SvgIcon from '@mui/material/SvgIcon';
import Box from '@mui/material/Box';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Backdrop from '@mui/material/Backdrop';
import ExpandMoreRoundedIcon from '../../assets/arrow.svg?react';
import { AlbumItem } from "../../types";
import BaseImgBox from "../../components/Boxes";
import JSZip from 'jszip'
import { saveAs } from "file-saver";
import { useCallback, useRef, useState } from "react";
import CloseIcon from '../../assets/close.svg?react';
import DownloadIcon from '../../assets/download.svg?react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { isMobile } from "react-device-detect";
import ArrowForward from '../../assets/arrow.svg?react';

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
        <Typography variant="subtitle1" >{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(data.createdAt))}</Typography>
        <IconButton aria-label="download" onClick={downloadFile} disabled={!data.status}>
          <SvgIcon component={DownloadIcon} />
        </IconButton>
      </AlbumHeader>
      <AccordionBox TransitionProps={{ unmountOnExit: true }} disabled={!data.status} >
        <AccordionSummary
          expandIcon={<SvgIcon component={ExpandMoreRoundedIcon} inheritViewBox sx={{ transform: 'rotate(90deg)' }} fontSize="large" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'h6' } }} >{data.status ? data.themeName : '생성 중'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {data.outputFiles.map((file, idx) =>
              <Grid key={idx} xs={12 / 5}>
                <BaseImgBox view hover square src={file} alt="dog" onClick={() => setOpen(idx)}></BaseImgBox>
                {open === idx &&
                  //이미지 미리보기
                  <Backdrop open={open === idx} onClick={() => setOpen(undefined)}
                    sx={{ zIndex: 100, cursor: "zoom-out" }}>
                    <Zoom in={open === idx} unmountOnExit>
                      <PreviewWrapper color="secondary.main">
                        <Swiper
                          initialSlide={idx}
                          zoom={true}
                          centeredSlides={true}
                          modules={[Pagination]}
                          pagination={{ type: 'fraction' }}
                          grabCursor={true}
                          navigation={{ prevEl: ".arrow-left", nextEl: ".arrow-right" }}
                        >
                          {data.outputFiles.map((content, idx) =>
                            <SwiperSlide key={idx}>
                              <Box sx={{ position: 'relative', display: 'inline-block', aspectRatio: '1/1', justifyContent: 'center', maxHeight: '100%' }}>
                                <img src={content} alt="dog" />
                                <IconButton
                                  color="inherit"
                                  sx={{ position: 'absolute', left: '4px', top: '4px' }}
                                  onClick={() => downloadSinglefile(file)} >
                                  <SvgIcon inheritViewBox component={DownloadIcon} />
                                </IconButton>
                                <IconButton color="inherit" sx={{ position: 'absolute', right: '4px', top: '4px' }} onClick={() => setOpen(undefined)}>
                                  <SvgIcon inheritViewBox component={CloseIcon} />
                                </IconButton>
                              </Box>
                            </SwiperSlide>)}
                        </Swiper>
                        <SvgIcon
                          inheritViewBox
                          component={ArrowForward}
                          className="arrow-left" color="secondary"
                          sx={{
                            position: 'relative',
                            fontSize: '40px',
                            transform: 'rotate(180deg)',
                            left: 'var(--gap-md)'
                          }}
                        />
                        <SvgIcon
                          inheritViewBox
                          component={ArrowForward}
                          className="arrow-right" color="secondary"
                          sx={{
                            fontSize: '40px',
                            position: 'relative',
                            right:  'var(--gap-md)'
                          }} />
                      </PreviewWrapper>
                    </Zoom>
                  </Backdrop>}
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </AccordionBox>
    </AlbumContainer >
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
  border: 1px solid;
  border-radius: var(--border-radius-sm) !important;
  :before {
    display: none;
  }
`

const PreviewWrapper = styled(Box)`
    display: flex;
    max-width: 100%;
    max-height: 100%;
    position: relative;
  .swiper-slide{
    /* 슬라이드 레이아웃 */
    text-align: center;
  }
  img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
  .swiper-pagination{
    bottom: 12px;
  }
  .arrow-left, .arrow-right{
    position: absolute;
    top: 50%;
    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
    z-index: 10;
    cursor: pointer;
  }
`

