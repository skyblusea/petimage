import { PetimageThemeBG, PetimegeThemeWH } from "../../components/Containers";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Image from "../../components/Image";
import { Button } from "@mui/material";
import { useState } from "react";


import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuModal from "../../components/MenuModal";


export default function Service() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


  return (
    <PetimageThemeBG>
      <PetimegeThemeWH full={true}>
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Typography variant="h2" color="petimage.main">서비스 소개</Typography>
          </Grid>
          <Grid xs={12} md={8}>
            <Typography sx={{ typography: { xs: 'subtitle2', lg: 'subtitle1' } }}>페티마제(petimage)는 Pet + Image를 합친 말로 부르기 쉽게
              ‘페티마제’라는 국문명으로 서비스 명칭을 정하였습니다.
            </Typography>
          </Grid>
          <Grid xs={12}>
            <Divider />
          </Grid>
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
          <Grid xs={6}>
            <Button
              id="user-menu-btn"
              sx={{
                flexShrink: 0,
                borderColor: 'var(--primary)',
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              startIcon={<AccountCircleOutlinedIcon />}
              aria-controls={open ? 'user-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="outlined"
              color="primary"
            >내 정보</Button>
            {open && <MenuModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
          </Grid>
        </Grid>
      </PetimegeThemeWH>
    </PetimageThemeBG>
  )
}

