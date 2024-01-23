import { Link } from "react-router-dom";
import { SingleSection } from "../../components/Containers"
import { LinkButton } from '../../components/LinkComponents';
import styled from "@emotion/styled";
import Symbol from '../../assets/symbol.svg?react'
import Logo2 from '../../assets/logo2.svg?react'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';


export default function Home() {
  return (
    <SingleSection>
      <ContentWrapper>
        <StyledSymbol />
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ gap: 'var(--gap-lg)', width: '100%', flexDirection: { xs : 'column', md: 'row' } }}>
          <Typography  color="white" variant="h1" sx={{ typography: { xs: 'h3' } }}>
            WELCOME TO
          </Typography>
          <Logo2 />
        </Box>
        <Box>
          <Typography  color="white" variant="body1" sx={{ typography: { xs: 'body3' } }}>
            페티마제는 반려동물 AI 프로필 사진을 생성해주는 서비스입니다.
          </Typography>
          <Typography  color="white" variant="body1" sx={{ typography: { xs: 'body3' } }}>
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
        endIcon={<ArrowForwardRoundedIcon />}
        sx={{
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