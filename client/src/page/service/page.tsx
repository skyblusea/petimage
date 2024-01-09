import styled from "@emotion/styled";
import { PetimageThemeBG, PetimegeThemeWH } from "../../components/Containers";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from "../../components/Image";

export default function Service() {
  return (
    <PetimageThemeBG>
      <PetimegeThemeWH>
        <ServiceHeader>
          <Typography flexShrink="0" variant="h2" color="petimage.main">서비스 소개</Typography>
          <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>페티마제(petimage)는 Pet + Image를 합친 말로 부르기 쉽게
            ‘페티마제’라는 국문명으로 서비스 명칭을 정하였습니다.</Typography>
        </ServiceHeader>
        <ServiceBody>
          <Divider flexItem />
          
          <Grid container spacing={1}>
            <Grid xs={12}>
              <Typography variant="body1">페티마제(Petimage)에서 개발 중인 인공지능 기술을 통해 반려동물의 새로운 모습을 만나볼 수 있으며, 사용자에게 가치 있는 소비와 재미를 드리기 위해 기술 연구와 다양한 서비스를 기획하고 있습니다.</Typography>
            </Grid>
            <Grid xs={12}>
              <Image src="/service/service1.png" alt="service_intro1" />
            </Grid>
            <Grid xs={12}>
              <Typography variant="body1">스튜디오에서 촬영하기 힘든 신기하고 재밌는 컨셉의 프로필 사진을 페티마제(Petimage)를 통해 집에서 쉽게 만나볼 수 있습니
                다. 반려동물을 데리고 스튜디오를 방문하기 힘들거나 사진 촬영을 힘들어하는 아이들을 위해 다양한 컨셉과 최상의 퀄리티를 제
                공하도록 노력하겠습니다. 많은 관심과 사랑 부탁드립니다!</Typography>
            </Grid>
            <Grid xs={6}>
              <Image src="/service/service2.png" alt="service_intro1" />
            </Grid>
            <Grid xs={6}>
              <Image src="/service/service3.png" alt="service_intro1" />
            </Grid>
          </Grid>
        </ServiceBody>
      </PetimegeThemeWH>
    </PetimageThemeBG>
  )
}



const ServiceHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--gap-lg);
  gap: var(--gap-lg);
`

const ImgWrapper = styled.div`
  img{
    width: 100%;
  }
`

const ServiceBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: var(--gap-lg);
  gap: var(--gap-lg);
`