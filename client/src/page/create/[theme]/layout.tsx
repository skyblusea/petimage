import { SingleSection } from "../../../components/Containers";
import ArrowIcon from '../../../assets/arrow.svg?react';
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet, redirect, useLoaderData, useLocation, useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";
import { QueryClient, useQuery } from "@tanstack/react-query"
import type { Params } from '@remix-run/router/utils';
import { themeQuery } from "../page";
import { AxiosInstance } from "axios"
import styled from "@emotion/styled";
import { Theme } from '../../../types';
import useAuth from "../../../util/useAuth";


// export const loader = (queryClient: QueryClient, authClient: AxiosInstance) =>
//   async ({ params }: { params: Params }) => {
//     const { theme: themeId } = params
//     const query = themeQuery(authClient)
//     try {
//       const data = await queryClient.fetchQuery(query)
//       const filtered = data?.filter(ele => ele._id === themeId)[0]
//       if (!filtered) {
//         alert('존재하지 않는 테마입니다.')
//         return redirect('/create')
//       }
//       const themeData = {
//         themeId: filtered._id,
//         amount: filtered.amount,
//         name: filtered.name,
//         price: filtered.price,
//         type: filtered.type,
//       }
//       return themeData
//     } catch (error) {
//       queryClient.removeQueries(query);
//       return null;
//     }
//   }



export default function CreateLayout() {
  const params = useParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const initialData = useLoaderData() as Array<Theme>
  const { authClient, isAuthenticated } = useAuth()
  const { data: theme } = useQuery({
    ...themeQuery(authClient),
    initialData: initialData ? initialData : undefined,
    enabled: isAuthenticated,
  })

  const selectedTheme = params.theme
  const bg = selectedTheme && theme?.filter(ele => ele._id === selectedTheme)[0].background

  const title = {
    theme: '테마를 선택해주세요.',
    animal: '동물을 선택해주세요.',
    breeds: {
      dog: '견종을 선택해주세요.',
      cat: '묘종을 선택해주세요.'
    },
    upload: '10-12장의 사진을 업로드 해주세요.',
    checkout: '결제를 진행해주세요.'
  }
  const subTitle = {
    theme: '좌우로 스크롤 또는 화살표를 누르면 테마를 확인할 수 있습니다.',
    animal: 'AI 이미지를 제작하고자 하는 동물을 선택해주세요.',
    breeds: 'AI 이미지를 제작하고자 하는 동물을 선택해주세요.',
    upload: '가이드를 확인하시고 10~12장 사진을 업로드해주세요.',
  }


  return (
    <ThemedBG bg={bg}>
      <Grid container spacing={{ xs: 2, md: 5.5 }} color="primary.main" sx={{ width: '100%' }}>
        <Grid xs={12} color="secondary.main" display="flex" alignItems="center" justifyContent="center" height="200px">
          <Box display="flex" width="100%" alignItems="start">
            <IconButton onClick={() => navigate(-1)} aria-label="arrow-back" color="inherit" sx={{ paddingTop: 0 }}>
              <SvgIcon component={ArrowIcon} inheritViewBox sx={{ transform: 'rotate(180deg)', typography: { xs: 'h5', lg: 'h4' } }} />
            </IconButton>
            <Box sx={{ flex: '1' }}>
              <Typography component="h1" sx={{ textAlign: "center", width: '100%', margin: 0, typography: { xs: 'h5', lg: 'h4' } }}>
                {
                  params.theme
                    ? params.animal
                      ? params.breed
                        ? title.upload
                        : title.breeds[params.animal as keyof typeof title.breeds]
                      : title.animal
                    : pathname.includes('checkout')
                      ? title.checkout
                      : title.theme
                }
              </Typography>
              <Typography sx={{ textAlign: "center", width: '100%', margin: 0, typography: { xs: 'body2', lg: 'body1' } }}>
                {
                  params.theme
                    ? params.animal
                      ? params.breed
                        ? subTitle.upload
                        : subTitle.breeds
                      : subTitle.animal
                    : pathname.includes('checkout')
                      ? ''
                      : subTitle.theme
                }
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} display="flex" justifyContent="center" >
          <Outlet />
        </Grid>
      </Grid>
    </ThemedBG>
  )
}

interface ThemedBGProps {
  bg?: string
}

const ThemedBG = styled(SingleSection) <ThemedBGProps>`
  ${props => props.bg && `background-image: url(${props.bg})`}
`
