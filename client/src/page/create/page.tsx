import styled from "@emotion/styled";
import { SingleSection } from "../../components/Containers";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";


export default function Create() {

  const params = useParams();

  const navigate = useNavigate();

  return (
    <SingleSection>
      <Grid container spacing={{ xs: 2, md: 5.5 }} color="primary.main">
        <Grid xs={12} display="flex" alignItems="center" justifyContent="center">
          <IconButton
            onClick={() => navigate(-1)}
            color="primary" aria-label="arrow-back">
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: { xs: '1.5rem', lg: '2.125rem' } }} />
          </IconButton>
          <Box sx={{ flex: '1' }}>
            <Typography component="h1" sx={{ textAlign: "center", width: '100%', margin: 0, typography: { xs: 'h5', lg: 'h4' } }}>
              {!params.breed && `${params.animal ? (params.animal === 'dog' ? '견종' : '묘종') : '동물'}을 선택해주세요`}
              {params.breed && '10-12장의 사진을 업로드 해주세요.'}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Outlet />
          </Box>
        </Grid>
      </Grid>
    </SingleSection>
  )
}


