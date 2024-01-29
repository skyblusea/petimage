import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';


export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: var( --nav-h);
  flex-direction: column;
  display: flex;
  position: relative;
  .bg{
    position: absolute;
    top: 0;
    z-index: -100;
    display: flex;
    video {
      object-fit: cover;
    }
  }
`

export const SingleSection = styled.section`
  /* flex: 1; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav);
  /* max-height: calc(100vh - calc( var(--nav-h) + var(--footer-h))); */
`

export const MultiSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav);
  flex-direction: column;
`

export const PetimageThemeBG = styled.section`
  background-color: var(--petimage);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
`


interface PetimageThemeProps {
  color?: string;
  full?: boolean;
}

export const PetimegeThemeWH = styled.div<PetimageThemeProps>`
  background-color: ${props => props.color || "white"};
  padding: var(--pd-nav);
  padding-top: 40px;
  width: 100%;
  height: 100%;
  flex-grow: ${props => props.full && 1};
`

export const PetimageThemeContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`
export const PetimegeThemeHeader = styled.div<PetimageThemeProps>`
  background-color: var(--petimage);
  padding: var(--pd-nav);
  padding-top: 60px;
  padding-bottom: var(--gap-lg);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 900px){
    flex-direction: column;
    }
  h2 {
    flex-shrink: 0;
    margin-right: var(--gap-md);
  }
`

export const PetimegeThemeContent = styled.div<PetimageThemeProps>`
  background-color: white;
  width: 100%;
  padding: var(--pd-nav);
  padding-bottom: var(--gap-lg);
  padding-top: var(--gap-lg);

`



export const RoundPaper = styled(Paper)`
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--gap-lg);
`

export const BgContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: aliceblue;
  /* overflow: hidden; */
  position: relative;
  >div {
    position: absolute;
    top: 0;
    left: 0;
  }
`