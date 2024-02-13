import styled from "@emotion/styled"
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import { isMobile } from "react-device-detect";

export default function Footer() {

  return (
    <FooterContainer isMobile={isMobile}>
      <Box display="flex" gap="var(--gap-md)" color="text.secondary">
        <Link to="#">개인정보처리방침</Link>
        <Link to="#">이용약관</Link>
        <Link to="#">문의하기</Link>
      </Box>
      <Box
        color="text.secondary"
        sx={{'& > span': { margin: '0px 4px', '::after': { content: '"|"' }}}}>
        <b>상호명</b>{' '}주식회사 에스알유니버스<span />
        <b>대표자</b>{' '}배지우<br />
        <b>사업자등록번호</b>{' '}565-86-00554<span /><b>전화</b>{' '}070-8806-1022<br />
        <b>주소</b>{' '}서울특별시 마포구 동교로22길 50, 202호<br />

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
  gap: var(--gap-sm);
  /* align-items: ${props => props.isMobile ? 'flex-start' : 'center'}; */
  padding-top : ${props => props.isMobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  padding-bottom : ${props => props.isMobile ? 'var(--gap-xs)' : 'var(--gap-sm)'};
  justify-content: space-between;
  font-size: 12px;
  flex-direction: column;
`