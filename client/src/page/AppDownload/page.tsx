import styled from "@emotion/styled";
import { SingleSection } from "../../components/Containers";
import Typography from "@mui/material/Typography";
import Logo from '../../assets/logo.svg?react'
import SvgIcon from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";
import GooglePlayIcon from '../../assets/google-play-badge.png';
import AppleIcon from '../../assets/apple-badge.svg';
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

export default function AppDownload() {
  return (
    <ColoredBg>
      <Box maxWidth='600px' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex:'2', pt: isMobile ?'180px' :'60px' }}>
        <Typography variant="subtitle1" align="center" color="white" gutterBottom>
          스튜디오를 가지 않아도 다양한 컨셉으로 프로필 사진을 만들 수 있습니다!
        </Typography>
        <Typography variant="h4" align="center" color="white">
          반려동물 AI 이미지 생성 서비스
        </Typography>
        <StlyedLogo />
        <Box
          display="flex"
          sx={{
            width: '50%',
            minWidth: '400px',
            gap: 'var(--gap-lg)',
            mt: isMobile ?'70px' :'20px',
            'img': { objectFit: 'contain', height: 'auto', width: '100%' },
            'a': { display: 'flex', height: 'auto', width: '100%' }
          }}
        >
          <Link
            to="https://play.google.com/store/apps/details?id=com.sru.petimage">
            <img src={GooglePlayIcon} alt="Google Play" />
          </Link>
          <Link
            to="https://apps.apple.com/kr/app/petimage-%ED%8E%98%ED%8B%B0%EB%A7%88%EC%A0%9C-%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC-ai-%ED%94%84%EB%A1%9C%ED%95%84-%EC%83%9D%EC%84%B1/id6474981634">
            <img src={AppleIcon} alt="App Store" />
          </Link>
        </Box>
      </Box>
      <Img src="app_intro.png" alt="app_intro" />
    </ColoredBg>
  )
}

const StlyedLogo = styled(Logo)`
  width: 300px;
  margin-top: 20px;
`

const Img = styled.img`
    z-index: 1;
    position : absolute;
    bottom: 0;
    height: 70%;
`

const ColoredBg = styled(SingleSection)`
  background-color: var(--petimage);
  width: 100%;
  color: white;
  position: relative;
`


// petimage 페티마제 - 반려동물 AI 프로필 생성

// 그 동안 찍었던 사진으로 자유롭게 생성해보는 반려동물 AI 이미지!
// 따로 스튜디오를 가지 않아도 다양한 컨셉으로 프로필 사진을 만들 수 있습니다!

// [다양한 테마]
// 사용자의 니즈를 적극 반영하여 다양한 테마들을 꾸준히 업데이트할 예정입니다. 업데이트 소식과 인기있는 테마를 확인할 수 있습니다.

// [쉬운 사진 업로드]
// 새로 찍지 않아도 기존에 가지고 있던 사진으로도 새로운 분위기의 이미지를 생성할 수 있습니다.

// [고퀄리티의 생성형 이미지]
// 각 반려동물의 아이덴티티를 최대한 유지하여 고퀄리티의 이미지를 얻을 수 있습니다.


// 앞으로 업데이트될 다양한 테마를 통해 너무너무 자랑하고 싶은 고퀄리티의 이미지를 만들어드릴게요!