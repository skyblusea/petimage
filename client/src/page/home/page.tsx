import { SingleSection } from "../../components/Containers"
import LinkButton from '../../components/LinkButton';
import styled from "@emotion/styled";

export default function Home() {
  return (
    <SingleSection>
      <ButtonWrapper>
        <LinkButton to="/create" variant="outlined"
          size='large'
          color="primary"
          sx={{
            padding: { xs: '0.75rem 2.5rem', lg: '1rem 3rem' },
          }}>
          제작하기
        </LinkButton>
        <LinkButton
          size='large'
          to="/trial" variant="outlined" color="primary"
          sx={{
            padding: { xs: '0.75rem 2.5rem', lg: '1rem 3rem' },
          }}>
          체험하기
        </LinkButton>
      </ButtonWrapper>
    </SingleSection>
  )
}


const ButtonWrapper = styled.div`
    display: flex;
    gap: 3.12rem;
  @media screen and (max-width: 1280px){
    gap: 1rem ;
  }

`
