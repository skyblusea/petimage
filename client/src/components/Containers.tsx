import styled from "@emotion/styled";


export const MainContainer = styled.main`
  width: 100%;
  height: 80%;
  padding-top: 92px;
  background-color: darkblue;
  flex-direction: column;
  @media screen and (max-width: 900px){
    padding-top: 60px;
  }
`

export const SingleSection = styled.section`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 92px - 30px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pd-lg);
  @media screen and (max-width: 1200px){
    padding: var(--pd-md);
  }
  @media screen and (max-width: 900px){
    padding: var(--pd-sm);
    min-height: calc(100vh - 60px - 40px);
  }
`

export const MultiSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pd-lg);
  @media screen and (max-width: 1200px){
    padding: var(--pd-md);
  }
  @media screen and (max-width: 900px){
    padding: var(--pd-sm);
  }
`