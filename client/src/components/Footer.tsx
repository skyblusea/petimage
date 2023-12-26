import styled from "@emotion/styled"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <FooterContainer>
      <Link to="#">개인정보처리방침</Link>
      <Link to="#">이용약관</Link>
      <Link to="#">문의하기</Link>
    </FooterContainer >
  )
}


const FooterContainer = styled.footer`
  width: 100%;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--gap-sm);
`