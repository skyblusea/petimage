import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"

export default function Footer() {
  const isHome = useLocation().pathname === '/'

  return (
    <FooterContainer isHome={isHome}>
      <Link to="#">개인정보처리방침</Link>
      <Link to="#">이용약관</Link>
      <Link to="#">문의하기</Link>
    </FooterContainer >
  )
}

type FooterProps = {
  isHome: boolean
}

const FooterContainer = styled.footer<FooterProps>`
  width: 100%;
  height: 30px;
  color: ${props => props.isHome ? 'white' : 'var(--black)'};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap-sm);
`