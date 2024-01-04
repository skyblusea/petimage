import styled from "@emotion/styled";


export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: var( --nav-h);
  flex-direction: column;
  display: flex;
`

export const SingleSection = styled.section`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav-lg);
  @media screen and (max-width: 1200px){
    padding: var(--pd-nav-md);
  }
  @media screen and (max-width: 900px){
    padding: var(--pd-nav-sm);
  }
`

export const MultiSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav-lg);
  @media screen and (max-width: 1200px){
    padding: var(--pd-nav-md);
  }
  @media screen and (max-width: 900px){
    padding: var(--pd-nav-sm);
  }
`