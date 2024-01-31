import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { PetimageThemeContainer, PetimegeThemeContent, PetimegeThemeHeader } from '../../components/Containers';
import styled from '@emotion/styled';
import { useState } from 'react';
import { themeQuery } from '../create/page';
import { useLoaderData } from 'react-router-dom';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { Theme } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CustomImage from '../../components/CustomImage';

export const loader = (queryClient: QueryClient) =>
  async () => {
    const query = themeQuery()
    const data = queryClient.ensureQueryData(query)
    return data
  }



//TODO 추후 migration 필요

export default function Product() {

  const initialData = useLoaderData() as Array<Theme>
  const { data: theme } = useQuery({
    ...themeQuery(),
    initialData,
  })

  const [tap, setTap] = useState(0)
  const tags = theme[tap].tag.split(',')
  return (

    <PetimageThemeContainer>
      <PetimegeThemeHeader>
        <Typography variant="h2" color="secondary">상품 소개</Typography>
        <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>페티마제에서 제공하는 AI 이미지 생성 상품을 소개합니다.
          테마는 꾸준히 업데이트 될 예정이니 소식을 받으시려면
          마케팅 이용 동의 및 광고/홍보 수신을 동의해주세요.
        </Typography>
      </PetimegeThemeHeader>
      <PetimegeThemeContent>
        <Grid container rowSpacing={4}>
          <Grid xs={12}>
            <Stack direction="row" spacing={1}>
              {theme.map((content, idx) =>
                <Chip key={content._id} color="primary" label={content.name} variant={idx === tap ? 'filled' : 'outlined'} onClick={() => setTap(idx)} />
              )}
            </Stack>
          </Grid>
          <Grid container xs={12} spacing={2}>
            <Grid xs={12} md={6}>
              <CustomImage src={theme[tap].sample[0]} alt="product_img0" />
            </Grid>
            <Grid xs={12} md={6} display="flex" flexDirection="column" justifyContent="space-between">
              <Typography variant="body1">{theme[tap].desc}</Typography>
              <Box display="flex" flexDirection="column" sx={{gap:'var(--gap-sm)'}}>
                <Box>
                  <Box display="flex" sx={{ gap: 'var(--gap-xs)' }}>
                    <CheckRoundedIcon />
                    <Typography variant="body1">Image Point</Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>{tags.map((tag, idx) => <p key={idx}>#{tag}</p>)}</Stack>
                </Box>
                <Wrapper>
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={8}
                    modules={[Pagination, Navigation]}
                    pagination={true}
                    grabCursor={true}
                    navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
                  >
                    {theme[tap].sample.map((src, idx) =>
                      <SwiperSlide key={idx}>
                        <CustomImage src={src} alt={`product_img${idx}`} />
                      </SwiperSlide>)}
                    <ArrowBackIosNewRoundedIcon
                      className="arrow-left" color="primary"
                      sx={{
                        display: { xs: 'none !important', md: 'flex !important' },
                        fontSize: { xs: '2.25rem', lg: '3rem' },
                        left: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
                      }}
                    />
                    <ArrowForwardIosRoundedIcon
                      className="arrow-right" color="primary"
                      sx={{
                        display: { xs: 'none !important', md: 'flex !important' },
                        fontSize: { xs: '2.25rem', lg: '3rem' },
                        right: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
                      }} />
                  </Swiper>
                </Wrapper>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </PetimegeThemeContent>
    </PetimageThemeContainer >
  )
}


const Wrapper = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* color: var(--white); */
  /* width: 100%; */
  /* position: relative; */
    /* margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1; */
  .swiper-slide{
  /* 슬라이드 레이아웃 */
    /* & >div{
      display: flex;
      flex-direction: column;
      flex: 1;
    } */
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

