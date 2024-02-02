import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"
import Box from '@mui/material/Box';

export default function Footer() {
  const pathname = useLocation().pathname
  const hasGifBG = pathname === '/' || pathname === '/create'
  return (
    <FooterContainer hasGifBG={hasGifBG}>
      <Box display="flex" gap="var(--gap-md)">
        <Link to="#">개인정보처리방침</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">문의하기</Link>
      </Box>
      <Box display="flex" gap="var(--gap-md)">
        <p>사업자등록번호 1234-5678-0000</p>
        <p>통신판매업신고번호 2000-서울마포-0000호</p>
      </Box>
    </FooterContainer >
  )
}

type FooterProps = {
  hasGifBG: boolean
}

const FooterContainer = styled.footer<FooterProps>`
  width: 100%;
  height: var(--footer-h);
  color: ${props => props.hasGifBG ? 'white' : 'var(--black)'};
  display: flex;
  padding: 0 var(--pd-nav);
  align-items: center;
  justify-content: space-between;
  gap: var(--gap-lg);
  overflow-x: hidden;
  min-width: 810px;
`