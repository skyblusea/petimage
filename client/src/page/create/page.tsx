import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Button, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkButton from '../../components/LinkButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { RoundPaper, SingleSection } from '../../components/Containers';
import { apiClient } from '../../util/axiosInstance';
import { QueryClient } from "@tanstack/react-query"
import { useLoaderData } from 'react-router-dom';
import CustomImage from '../../components/CustomImage';
import BaseImgBox, { BaseCreateBox } from '../../components/Boxes';
import { LinkBox } from '../../components/LinkComponents';


export const loader = (queryClient: QueryClient) =>
  async () => {
    const query = themeQuery()
    const data = queryClient.ensureQueryData(query)
    return data
  }

type Theme = {
  _id: string;
  name: string;
  desc: string;
  prompt: string[];
  background: string;
  tag: string;
  type: string;
  price: string;
  popular: number;
  amount: number;
  sample: string[];
  trial: string[];
  createdAt: string;
  updatedAt: string;
  category: string[];
}

const themeQuery = () => ({
  queryKey: ['theme'],
  queryFn: async (): Promise<Array<Theme>> => {
    const { data: { data: { themes: data } } } = await apiClient.get('/theme/list')
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})




//TODO 추후 migration 필요
export default function Theme() {
  const theme = useLoaderData() as Array<Theme>
  console.log('theme', theme)

  return (
    <SingleSection>
      <BannerWrapper>
        <Swiper
          modules={[Pagination]}
          // autoplay={{ delay: 3000 }}
          centeredSlides={true}
          slidesPerView={1}
          pagination={true}
          grabCursor={true}
          navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
        >
          {theme.map((content, idx) =>
            <SwiperSlide key={content._id}>
              <LinkBox to={`/create/${content._id}`}
              {...{padding:"var(--pd-sm)", paddingBottom:"calc(var(--gap-lg) + 20px)"}}>
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
                  <Box display="flex" width="100%">
                    <Typography variant="body1" sx={{ typography: { xs: 'body2', md: 'body1' } }}>
                      {content.desc}
                    </Typography>
                  </Box>
                </RoundPaper>
              </LinkBox>
            </SwiperSlide>)}
        </Swiper>
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
      </BannerWrapper>
    </SingleSection>

  )
}



const BannerWrapper = styled.div`
  display: flex;
  color: var(--white);
  /* width: calc(100% - 40px); */
  width: calc(100%);
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
