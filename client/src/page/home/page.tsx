import { Link } from "react-router-dom";
import { SingleSection } from "../../components/Containers"
import { LinkButton } from '../../components/LinkComponents';
import styled from "@emotion/styled";
import Symbol from '../../assets/symbol.svg?react'
import Logo from '../../assets/logo.svg?react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Arrow from '../../assets/arrow2.svg?react';


export default function Home() {
  return (
    <SingleSection center>
      <ContentWrapper>
        <StyledSymbol />
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ 
          'svg': {height: '48px'},
          gap: { xs: 'var(--gap-sm)', md: 'var(--gap-lg)' }, width: '100%', flexDirection: { xs: 'column', md: 'row' }, color: 'white' }}>
          <Typography color="white" sx={{ typography: { xs: 'h4', md:'h3' }, flexShrink: 0 }}>
            WELCOME TO
          </Typography>
          <Logo />
        </Box>
        <Box>
          <Typography color="white" sx={{ typography: { xs: 'body2', md: 'body1' }}}>
            페티마제는 반려동물 AI 프로필 사진을 생성해주는 서비스입니다.<br/>
            페티마제와 함께 반려동물이 뛰어노는 세상으로 여행해볼까요?
          </Typography>
        </Box>
      </ContentWrapper>
      <LinkButton
        variant="contained"
        to="/create"
        component={Link}
        size='large'
        color="petimage"
        endIcon={<Arrow />}
        sx={{
          fontSize: '1rem',
          padding: { xs: '0.75rem 2.5rem', lg: '1rem 3rem' },
        }}>
        AI 이미지 제작하기
      </LinkButton>
    </SingleSection>
  )
}




const StyledSymbol = styled(Symbol)`
  width: 100px;
  height: 100px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-lg);
  margin-bottom: var(--gap-lg);
`