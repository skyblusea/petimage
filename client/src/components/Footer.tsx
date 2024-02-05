import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { isMobile } from "react-device-detect";

export default function Footer() {

  return (
    <FooterContainer isMobile>
      <Box display="flex" gap="var(--gap-md)">
        <Link to="#">개인정보처리방침</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">문의하기</Link>
      </Box>
      <Box display="flex" gap="var(--gap-md)" flexDirection={isMobile ?'column':'row'}>
        <p>사업자등록번호 1234-5678-0000</p>
        <p>통신판매업신고번호 2000-서울마포-0000호</p>
      </Box>
    </FooterContainer >
  )
}

type FooterContainerProps = {
  isMobile: boolean
}


const FooterContainer = styled.footer<FooterContainerProps>`
  width: 100%;
  /* height: var(--footer-h); */
  color: var(--primary);
  background-color: white;
  /* border-top: 1px solid #EAEDEF; */
  display: flex;
  padding: 0 var(--pd-nav);
  align-items:${props => props.isMobile ? 'flex-start' : 'center'};
  padding-top :${props => props.isMobile ? 'var(--gap-xs)' : '0'};
  padding-bottom :${props => props.isMobile ? 'var(--gap-sm)' : '0'};
  justify-content: space-between;
  gap: var(--gap-lg);
  /* overflow: hidden; */
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
`