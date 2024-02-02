import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled from '@emotion/styled';
import { QueryClient, useQuery } from "@tanstack/react-query"
import { useRouteLoaderData } from 'react-router-dom';
import { Theme } from '../../types';
import { isMobile } from 'react-device-detect';
import Banner from './Banner';
import { AxiosInstance } from "axios";
import useAuth from '../../util/useAuth';
import ArrowForward from '../../assets/arrow.svg?react';
import SvgIcon from '@mui/material/SvgIcon';


export const loader = (queryClient: QueryClient, authClient: AxiosInstance) =>
  async () => {
    const query = themeQuery(authClient)
    try {
      const data = await queryClient.fetchQuery(query)
      console.log('theme', data)
      return data;
    } catch (error) {
      queryClient.removeQueries(query);
      return null;
    }
  }


export const themeQuery = (authClient: AxiosInstance) => ({
  queryKey: ['theme'],
  queryFn: async (): Promise<Array<Theme>> => {
    const { data: { data: { themes: data } } } = await authClient.get('/theme/list')
    return data
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})




//TODO 추후 migration 필요
export default function SelectTheme() {
  const initialData = useRouteLoaderData('theme') as Array<Theme>
  const { authClient, isAuthenticated } = useAuth()
  const { data: theme } = useQuery({
    ...themeQuery(authClient),
    initialData: initialData ? initialData : undefined,
    enabled: isAuthenticated,
  })


  return (
      <BannerWrapper isMobile={isMobile}>
        {isMobile
          ? <>{theme?.map((content, idx) => <Banner content={content} idx={idx} />)}</>
          : <>
            <Swiper
              modules={[Pagination, Navigation]}
              // centeredSlides={true}
              slidesPerView={3}
              // loop={true}
              pagination={true}
              grabCursor={true}
              navigation={{ prevEl: ".arrow-left", nextEl: ".arrow-right" }}
            >
              {theme?.map((content, idx) =>
                <SwiperSlide key={content._id}>
                  <Banner content={content} idx={idx} />
                </SwiperSlide>)}
            </Swiper>
            <SvgIcon
              inheritViewBox
              component={ArrowForward}
              className="arrow-left" color="secondary"
              sx={{
                transform: 'rotate(180deg)',
                display: { xs: 'none !important', md: 'flex !important' },
                fontSize: { xs: '2.25rem', lg: '3rem' },
                left: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
              }}
            />
            <SvgIcon
              inheritViewBox
              component={ArrowForward}
              className="arrow-right" color="secondary"
              sx={{
                display: { xs: 'none !important', md: 'flex !important' },
                fontSize: { xs: '2.25rem', lg: '3rem' },
                right: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
              }} />
          </>
        }

      </BannerWrapper>

  )
}

type BannerWrapperProps = {
  isMobile: boolean
}


const BannerWrapper = styled.div<BannerWrapperProps>`
  color: var(--white);
  width: 100%;
  position: relative;
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
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
