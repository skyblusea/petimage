import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { Box, Button, SvgIcon, Typography } from '@mui/material';
import styled from '@emotion/styled';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { RoundPaper, SingleSection } from '../../components/Containers';

import { QueryClient, useQuery } from "@tanstack/react-query"
import { Link, useLoaderData } from 'react-router-dom';
import BaseImgBox from '../../components/Boxes';
import { Theme } from '../../types';
import { apiClient } from '../../util/axiosInstance';
import { isMobile } from 'react-device-detect';



export const loader = (queryClient: QueryClient) =>
  async () => {
    const query = themeQuery()
    const data = queryClient.ensureQueryData(query)
    return data
  }


export const themeQuery = () => ({
  queryKey: ['theme'],
  queryFn: async (): Promise<Array<Theme>> => {
    const { data: { data: { themes: data } } } = await apiClient.get('/theme/list')
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})




//TODO 추후 migration 필요
export default function SelectTheme() {
  const initialData = useLoaderData() as Array<Theme>
  const { data: theme } = useQuery({
    ...themeQuery(),
    initialData,
  })
  console.log('isMobile', isMobile)

  return (
    <SingleSection>
      <BannerWrapper>
        <Swiper
          modules={[Pagination]}
          centeredSlides={true}
          slidesPerView={1}
          loop={true}
          pagination={true}
          grabCursor={true}
          navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
        >
          {theme.map((content, idx) =>
            <SwiperSlide key={content._id}>
              <Box padding="var(--pd-sm)" paddingBottom="calc(var(--gap-lg) + 20px)">
                <Link to={`/create/${content._id}`}>
                  <RoundPaper elevation={3}>
                    <BaseImgBox ratio="16/9" src={content.sample[0]} alt={`banner${idx}`} />
                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                      <Typography variant="h4" component="h1" sx={{ typography: { xs: 'h4', lg: 'h3' } }}>
                        {content.name}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          color: 'error.main',
                          typography: { xs: 'subtitle1', lg: 'subtitle0' }
                        }}>
                        {content.price} 원
                      </Typography>
                    </Box>
                    <Box display="flex" width="100%" >
                      <Typography variant="body1" sx={{ typography: { xs: 'body2', md: 'body1' } }}>
                        {content.desc}
                      </Typography>
                    </Box>
                  </RoundPaper>
                </Link>
              </Box>
            </SwiperSlide>)}
        </Swiper>
        <ArrowBackIosNewRoundedIcon
          className="arrow-left" color="secondary"
          sx={{
            display: { xs: 'none !important', md: 'flex !important' },
            fontSize: { xs: '2.25rem', lg: '3rem' },
            left: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
          }}
        />
        <ArrowForwardIosRoundedIcon
          className="arrow-right" color="secondary"
          sx={{
            display: { xs: 'none !important', md: 'flex !important' },
            fontSize: { xs: '2.25rem', lg: '3rem' },
            right: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
          }} />

      </BannerWrapper>
    </SingleSection>

  )
}



const BannerWrapper = styled.div`
  display: flex;
  color: var(--white);
  width: 100%;
  position: relative;

  .swiper-slide{
  /* 슬라이드 레이아웃 */
    & >div{
      display: flex;
      flex-direction: column;
      flex: 1;
    }
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
