import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button, SvgIcon, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkButton from '../../components/LinkButton';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

export default function Banner() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  console.log('isMd', isMd)
  return (
    <BannerWrapper>
      <Swiper
        modules={[Navigation]}
        autoplay={{ delay: 3000 }}
        slidesPerView={1}
        navigation={{ nextEl: ".arrow-left", prevEl: ".arrow-right" }}
      >
        {slideContent.map((slideContent) => <SwiperSlide key={slideContent.id}>
          <BannerLeft>
            <div className="title">
              <Typography variant="h4" component="h1" sx={{ typography: { xs: 'h3', lg: 'h2' } }}>
                {slideContent.title}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'var(--primary)',
                  typography: { xs: 'subtitle1', lg: 'subtitle0' }
                }}>
                {slideContent.price}
              </Typography>
            </div>
            <Typography variant="body3" sx={{ typography: { xs: 'body2', lg: 'body1' } }}>
              {slideContent.capa}
            </Typography>
            <Typography variant="body3"
              sx={{
                height: '100%',
                typography: { xs: 'body2', lg: 'body1' },
                whiteSpace: 'pre-line',
              }}>
              {slideContent.body}
            </Typography>
            <ButtonWrapper>
              <LinkButton to="/create" variant="outlined"
                size='large'
                color="primary"
                sx={{
                  padding: { xs: '0.75rem 2.5rem', lg: '1rem 3rem' },
                  borderRadius: '100px'
                }}>
                제작하기
              </LinkButton>
              <LinkButton
                size='large'
                to="/trial" variant="outlined" color="primary"
                sx={{
                  padding: { xs: '0.75rem 2.5rem', lg: '1rem 3rem' },
                  borderRadius: '100px'
                }}>
                체험하기
              </LinkButton>
            </ButtonWrapper>
          </BannerLeft>
          <BannerRight>
            <img src={slideContent.imgUrl} alt="banner" />
            <LinkButton
              variant="text"
              color="primary"
              to='/service'
              endIcon={<KeyboardBackspaceIcon sx={{ rotate: "180deg" }} />}
            >더 구경하기
            </LinkButton>
          </BannerRight>
        </SwiperSlide>)}
      </Swiper>
      <ArrowBackIosNewRoundedIcon
        className="arrow-left" color="primary"
        sx={{
          fontSize: { xs: '2.25rem', lg: '3rem' },
          left: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
        }} 
        />
      {/* <SvgIcon component={ArrowIcon} inheritViewBox 
        className="arrow-right" color="primary"
        sx={{
          fontSize: { xs: '2.25rem', lg: '3rem' },
          right: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
        }} /> */}
      <ArrowForwardIosRoundedIcon
        className="arrow-right" color="primary"
        sx={{
          fontSize: { xs: '2.25rem', lg: '3rem' },
          right: { xs: 'calc(-2.25rem - 16px)', lg: 'calc(-3rem - 16px)' }
        }} />
    </BannerWrapper>
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
    display: flex;
    gap: var(--gap-lg);
    height: 100%;
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
const BannerLeft = styled.div`
  justify-content: space-between;
  gap: var(--gap-lg);
  & .title{
    display: flex;
    align-items: end;
    justify-content: space-between;
  }
  @media screen and (max-width: 1280px){
    gap: var(--gap-md);
  }
`
const ButtonWrapper = styled.div`
    display: flex;
    gap: 3.12rem;
  @media screen and (max-width: 1280px){
    gap: 1rem ;
  }

`



const BannerRight = styled.div`
  display: flex;
  & img{
    width: 100%;
    object-fit: cover;  
  }
`

const slideContent = [
  {
    "id": 0,
    "title": '스쿠버 다이빙',
    "price": '₩5,900',
    "capa": '컨셉사진/30장',
    "body": '반려동물이 자유롭게 바다 속을 헤엄치며\n 즐거워하는 모습을 AI 이미지를 통해\n만나보실 수 있습니다.',
    "imgUrl": "/banner1.png"
  },
  {
    "id": 1,
    "title": '우주비행사',
    "price": '₩5,900',
    "capa": '컨셉사진/30장',
    "body": '반려동물이 우주비행사가 되어\n광활한 우주를 여행하는 모습은 어떠신가요?',
    "imgUrl": "/banner2.png"
  },
]