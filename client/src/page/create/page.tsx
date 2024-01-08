import { SingleSection } from "../../components/Containers";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";

export default function Create() {

  const params = useParams();
  const navigate = useNavigate();
  const pathname = useLocation().pathname;


  const title = {
    animal : '동물을 선택해주세요.',
    breeds : {
      dog : '견종을 선택해주세요.',
      cat : '묘종을 선택해주세요.'
    },
    upload : '10-12장의 사진을 업로드 해주세요.',
    checkout : '결제를 진행해주세요.'
    }




  return (
    <SingleSection>
      <Grid container spacing={{ xs: 2, md: 5.5 }} color="primary.main" sx={{width : '100%'}}>
        <Grid xs={12} display="flex" alignItems="center" justifyContent="center">
          <IconButton
            onClick={() => navigate(-1)}
            color="primary" aria-label="arrow-back">
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: { xs: '1.5rem', lg: '2.125rem' } }} />
          </IconButton>
          <Box sx={{ flex: '1' }}>
            <Typography component="h1" sx={{ textAlign: "center", width: '100%', margin: 0, typography: { xs: 'h5', lg: 'h4' } }}>
              {
                params.animal
                  ? params.breed
                    ? pathname.includes('checkout')
                      ? title.checkout 
                      : title.upload
                    : title.breeds[params.animal as keyof typeof title.breeds]
                  : title.animal
              }
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} display="flex">
          <Box sx={{ flex: 1 }} display="flex" flexDirection="column">
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </SingleSection>
  )
}


