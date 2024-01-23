import styled from "@emotion/styled";
import { StyledEngineProvider } from "@mui/material";
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
  flex: 1;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav);
`

export const MultiSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: var(--pd-nav);
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
  border-top-right-radius: var(--border-radius-xl);
  border-top-left-radius: var(--border-radius-xl);
  background-color: ${props => props.color || "white"};
  padding: var(--pd-nav);
  padding-top: 40px;
  width: 100%;
  height: 100%;
  flex-grow: ${props => props.full && 1};
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