import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"

export default function Footer() {
  const pathname = useLocation().pathname
  const hasGifBG = pathname === '/' || pathname === '/create'
  return (
    <FooterContainer hasGifBG={hasGifBG}>
      <Link to="#">개인정보처리방침</Link>
      <Link to="#">이용약관</Link>
      <Link to="#">문의하기</Link>
    </FooterContainer >
  )
}

type FooterProps = {
  hasGifBG: boolean
}

const FooterContainer = styled.footer<FooterProps>`
  width: 100%;
  height: 30px;
  color: ${props => props.hasGifBG ? 'white' : 'var(--black)'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap-sm);
`