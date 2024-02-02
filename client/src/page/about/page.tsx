import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { PetimageThemeContainer, PetimegeThemeContent, PetimegeThemeHeader } from '../../components/Containers';
import { Wrapper } from "@googlemaps/react-wrapper";
import styled from '@emotion/styled';
import GoogleMap from '../../components/GoogleMap';



export default function About() {
  const center = { lat: 37.554100036621094, lng: 126.91724395751953 };
  const zoom = 18;
  const location = { lat: 37.554100036621094, lng: 126.91724395751953 };


  return (
    <PetimageThemeContainer>
      <PetimegeThemeHeader>
        <Typography variant="h2" color="secondary">회사 소개</Typography>
        <Typography sx={{ typography: { xs: 'body1', lg: 'body0' } }}>페티마제(petimage)는 Pet + Image를 합친 말로 부르기 쉽게
          ‘페티마제’라는 국문명으로 서비스 명칭을 정하였습니다.
        </Typography>
      </PetimegeThemeHeader>
      <PetimegeThemeContent full={true}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Box display="flex" height="100%" flexDirection="column" justifyContent="space-between" gap="var(--gap-md)">
              <Box display="flex" flexDirection="column" >
                <Typography color="petimage.main" sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>
                  오시는 길
                </Typography>
                <Typography variant="body1">서울특별시 마포구 동교로 22길 50,<br/>2층 SR universe 사무실</Typography>
              </Box>
              <Box display="flex"flexDirection="column" >
                <Typography color="petimage.main" sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>
                  담당자
                </Typography>
                <Typography variant="body1">E-mail : admin@sruniverse.kr</Typography>
                <Typography variant="body1">Tel : 010-1234-5678</Typography>
              </Box>
              <ButtonWrraper>
                <Button sx={{ flexShrink: 0 }} variant="outlined">제휴문의</Button>
                <Button sx={{ flexShrink: 0 }} variant="outlined">협업소개</Button>
              </ButtonWrraper>
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Wrapper apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
              <GoogleMap center={center} zoom={zoom} location={location} />
            </Wrapper>
          </Grid>
        </Grid>
      </PetimegeThemeContent>
    </PetimageThemeContainer>
  );
}

const ButtonWrraper = styled.div`
  display: flex;
  width: 100%;
  gap: var(--gap-md);
`
