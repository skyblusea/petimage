import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { isMobile } from "react-device-detect";
import GooglePlayIcon from '../assets/google-play-badge.png';
import AppleIcon from '../assets/apple-badge.svg';


export default function Footer() {

  return (
    <FooterContainer ismobile={isMobile}>
      <Box display="flex" flexDirection="column" color="text.secondary" gap="var(--gap-xs)" >
        <Box sx={{ '& > span': { margin: '0px 4px', '::after': { content: '"|"' } } }}>
          <b>상호명</b>{' '}주식회사 에스알유니버스<span />
          <b>대표자</b>{' '}배지우<br />
          <b>사업자등록번호</b>{' '}565-86-00554<span /><b>전화</b>{' '}070-8806-1022<br />
          <b>주소</b>{' '}서울특별시 마포구 동교로22길 50, 202호<br />
        </Box>
        <Box display="flex" gap="var(--gap-md)">
          <Link to="#">개인정보처리방침</Link>
          <Link to="#">이용약관</Link>
          <Link to="https://docs.google.com/forms/d/e/1FAIpQLSdUEa3ZPvVzalM60NEguV4JEplD0zNdGpgjgbywcrG9nPf6NA/viewform">문의하기</Link>
        </Box>
      </Box>
      <Box color="text.secondary">
        앱 다운로드
        <Box
          display="flex"
          sx={{
            gap: 'var(--gap-xs)',
            'img': { objectFit: 'contain', height: 'auto', width: '130px' },
            'a': { display: 'flex', height: 'auto', width: '130px' }
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
    </FooterContainer >
  )
}

type FooterContainerProps = {
  ismobile: boolean
}


const FooterContainer = styled.footer<FooterContainerProps>`
  width: 100%;
  background-color: white;
  display: flex;
  padding: 0 var(--pd-nav);
  gap: var(--gap-xs);
  /* align-items: ${props => props.ismobile ? 'flex-start' : 'center'}; */
  padding-top : ${props => props.ismobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  padding-bottom : ${props => props.ismobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  justify-content: space-between;
  font-size: 12px;
  flex-direction: ${props => props.ismobile ? 'column' : 'row'};
`