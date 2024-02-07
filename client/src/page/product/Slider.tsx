import styled from '@emotion/styled';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckIcon from '../../assets/check.svg?react';
import Stack from '@mui/material/Stack';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
import SvgIcon from '@mui/material/SvgIcon';
import CustomImage from '../../components/CustomImage';
import { Theme } from '../../types';
import ArrowIcon from '../../assets/arrow.svg?react';
import { useState } from 'react';
import { isMobile } from 'react-device-detect';

export default function Slider({ tap, theme }: { tap: number, theme: Theme[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const tags = theme[tap].tag.split(',')


  return (
    <Grid xs={12}>
      {/* 메인 전시 사진 */}
      {isMobile &&
        <Box sx={{ mb : 'var(--gap-sm)'}}>
          <Typography variant="body1">{theme[tap].desc}</Typography>
        </Box>
      }
      <Wrapper isMobile={isMobile}>
        <Swiper
          loop={true}
          spaceBetween={10}
          pagination={{
            type: 'fraction',
          }}
          navigation={{ nextEl: '.arrow-right', prevEl: '.arrow-left'}}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Pagination]}
        >
          {theme[tap].sample.map((src, idx) =>
            <SwiperSlide key={idx}>
              <CustomImage src={src} alt={`product_img${idx}`} />
            </SwiperSlide>)}
          <SvgIcon
            inheritViewBox
            component={ArrowIcon}
            className="arrow-left" color="secondary"
            sx={{
              transform: 'rotate(180deg)',
              fontSize: { xs: '2.25rem', lg: '3rem' },
              left: { xs: '0' }
            }}
          />
          <SvgIcon
            inheritViewBox
            component={ArrowIcon}
            className="arrow-right" color="secondary"
            sx={{
              fontSize: { xs: '2.25rem', lg: '3rem' },
              right: { xs: 0 }
            }} />
        </Swiper>
        <Swiper
          //@ts-ignore
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {theme[tap].sample.map((src, idx) =>
            <SwiperSlide key={idx}>
              <CustomImage src={src} alt={`product_img${idx}`} />
            </SwiperSlide>)}
          <Box>
            <Typography variant="body1">{theme[tap].desc}</Typography>
            <Box display="flex" flexDirection="column" sx={{ gap: 'var(--gap-sm)' }}>
              <Box>
                <Box display="flex" sx={{ gap: 'var(--gap-xs)' }}>
                  <SvgIcon component={CheckIcon} />
                  <Typography variant="body1">Image Point</Typography>
                </Box>
                <Stack direction="row" spacing={1}>{tags.map((tag, idx) => <p key={idx}>#{tag}</p>)}</Stack>
              </Box>
            </Box>
          </Box>
        </Swiper>
      </Wrapper>
    </Grid>
  )
}

interface WrapperProps {
  isMobile: boolean
}


const Wrapper = styled.div<WrapperProps>`
  position: relative;
  .swiper-initialized{
    width: ${props => props.isMobile ? '100%' : 'calc(50% - 5px)'}; // preview 간격이 10px이므로 5px
    margin: 0;
    height: 100%;
  }
  ${props => props.isMobile

    ? '> :nth-of-type(2){ margin-top : 10px; > :nth-of-type(2){ display: none; }  }' // 모바일 간격 조정 & image point 숨김, preview 간격이 10px이므로 동일하게 mt 10px
    : `> :nth-of-type(2){
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    > :nth-of-type(2){
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-bottom: var(--gap-sm);
    }
    flex-direction: column-reverse;
    & .swiper-wrapper {
      height: 50%;
    }
  }`}
  .swiper-pagination{
    color: white;
  }
  .arrow-left, .arrow-right{
    position: absolute;
    top: 50%;
    margin-top: calc(0px - (var(--swiper-navigation-size) / 2));
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
// {/* 설명 */}


