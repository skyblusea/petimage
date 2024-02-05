import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { isMobile } from "react-device-detect";

export default function Footer() {

  return (
    <FooterContainer isMobile={isMobile}>
      <Box display="flex" gap="var(--gap-md)">
        <Link to="#">개인정보처리방침</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">문의하기</Link>
      </Box>
      <Box display="flex" 
      gap={isMobile ?'0' :'var(--gap-md)'}
      flexDirection={isMobile ?'column' :'row'}>
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
  background-color: white;
  display: flex;
  padding: 0 var(--pd-nav);
  align-items: ${props => props.isMobile ? 'flex-start' : 'center'};
  padding-top : ${props => props.isMobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  padding-bottom : ${props => props.isMobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  justify-content: space-between;
  font-size: 12px;
  color: var(--primary);
  flex-direction: ${props => props.isMobile ? 'column' : 'row'};
`