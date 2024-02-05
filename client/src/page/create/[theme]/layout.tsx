import { SingleSection } from "../../../components/Containers";
import ArrowIcon from '../../../assets/arrow.svg?react';
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";


export default function ThemeLayout() {
  const params = useParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
 
  const title = {
    theme: '테마를 선택해주세요.',
    animal: '동물을 선택해주세요.',
    breeds: {
      dog: '견종을 선택해주세요.',
      cat: '묘종을 선택해주세요.'
    },
    notice: '업로드 전 안내사항을',
    upload: '10-12장의 사진을 업로드 해주세요.',
    checkout: '결제를 진행해주세요.'
  }
  const subTitle = {
    theme: '좌우로 스크롤 또는 화살표를 누르면 테마를 확인할 수 있습니다.',
    animal: 'AI 이미지를 제작하고자 하는 동물을 선택해주세요.',
    breeds: 'AI 이미지를 제작하고자 하는 동물을 선택해주세요.',
    upload: '가이드를 확인하시고 10~12장 사진을 업로드해주세요.',
  }
  console.log(pathname)

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 5.5 }} color={(params.theme||pathname==='/create') ?'secondary.main' :'primary.main'} sx={{ width: '100%' }}>
        <Grid xs={12} display="flex" alignItems="center" justifyContent="center" height="200px">
          <Box display="flex" width="100%" alignItems="start">
            <IconButton onClick={() => navigate(-1)} aria-label="arrow-back" color="inherit" sx={{ mt: '-8px' }}>
              <SvgIcon component={ArrowIcon} inheritViewBox sx={{ transform: 'rotate(180deg)', typography: { xs: 'h5', lg: 'h4' } }} />
            </IconButton>
            <Box sx={{ flex: '1' }}>
              <Typography component="h1" sx={{ textAlign: "center", width: '100%', mb: "var(--gap-sm)", typography: { xs: 'h5', lg: 'h4' } }}>
                {
                  params.theme
                    ? params.animal
                      ? params.breed
                        ? pathname.includes('notice')
                          ? title.notice
                          : title.upload
                        : title.breeds[params.animal as keyof typeof title.breeds]
                      : title.animal
                    : pathname.includes('checkout')
                      ? title.checkout
                      : title.theme
                }
              </Typography>
              {pathname.includes('notice')
                ?
                <Box display="flex" width="100%" >
                  <Typography sx={{ textAlign: "center", typography: { xs: 'body2', lg: 'body1' } }}>
                    Petimage에서 제공하는 AI는 계속해서 학습을 진행중인 단계로 AI가 제공하는
                    <Typography component="span" color="error.main" sx={{ typography: { xs: 'body2', lg: 'body1' } }}> 일부 결과물이 만족스럽지못할 수</Typography>
                    있습니다.<br />발생할 수 있는 결함에 대한 너른 양해를 부탁드리며, 계속하실 경우 결과물에 대해 동의하는 것으로 간주됩니다.
                  </Typography>
                </Box>
                :
                <Typography sx={{ textAlign: "center", width: '100%', margin: 0, typography: { xs: 'body2', lg: 'body1' } }}>
                  {
                    params.theme
                      ? params.animal
                        ? params.breed
                          ? pathname.includes('upload') && subTitle.upload
                          : subTitle.breeds
                        : subTitle.animal
                      : pathname.includes('checkout')
                        ? ''
                        : subTitle.theme
                  }
                </Typography>
              }
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center" flexDirection="column" >
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}
