import styled from "@emotion/styled";
import Paper from '@mui/material/Paper';
import { isMobile } from "react-device-detect";


export const MainContainer = styled.main`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  padding-top: var(--nav-h);
  flex-direction: column;
  display: flex;
  position: relative;
  .bg{
    position : absolute;
    top: var(--nav-h);
    inset: 0;
    background-image: url('/bg_capture.png');
    background-position: center;
    width: 100%;
    height: 100%;
    background-size: cover;
    /* flex : 1; */
    /* top: var(--nav-h); */
    z-index: -100;
    overflow: hidden;
    /* display: flex; */
    video {
      object-fit: cover;
    }
  }
`
interface SingleSectionProps  {
  center?: boolean;
}

export const SingleSection = styled.section<SingleSectionProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: ${props => props.center ? 'center' : 'flex-start'};
  padding: 0 var(--pd-nav);
  padding-bottom: 20px; //footer과의 간격
`

export const MultiSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 var(--pd-nav);
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
  padding: 0 var(--pd-nav);
  padding-top: 40px;
  width: 100%;
  height: 100%;
  flex-grow: ${props => props.full && 1};
`

export const PetimageThemeContainer = styled.section`
  display: flex;
  flex-direction: column;
`
export const PetimegeThemeHeader = styled.div<PetimageThemeProps>`
  background-color: var(--petimage);
  padding: 0 var(--pd-nav);
  padding-top: 60px;
  padding-bottom: var(--gap-sm);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: top;
  flex-direction: ${isMobile ? 'column' : 'row'};
  h2 {
    flex-shrink: 0;
    margin-right: var(--gap-md);
  }
`

export const PetimegeThemeContent = styled.div<PetimageThemeProps>`
  background-color: white;
  width: 100%;
  padding: 0 var(--pd-nav);
  padding-bottom: var(--gap-lg);
  padding-top: var(--gap-lg);

`



export const RoundPaper = styled(Paper)`
  border-radius: var(--border-radius-lg);
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--pd-md);
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