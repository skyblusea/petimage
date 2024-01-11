
import { PetimageThemeBG, PetimegeThemeWH } from "../../components/Containers";
import styled from "@emotion/styled"
import { useContext, useState } from "react";
import { RoundPaper } from "../create/[animal]/notice/page";
import Gallery from "./Gallery";
import Payment from "./Payment";
import { Stack } from "@mui/material";
import { AuthContext } from "../../context/AuthProvider";

export default function Collection() {
  const [tab, setTab] = useState<'payments' | 'gallery'>('payments')

  return (
    <PetimageThemeBG>
      <PetimegeThemeWH>
        <TabContainer>
          <Tabs elevation={3}>
            <Tab onClick={() => setTab('payments')} role="tab" aria-label="payments" aria-selected={tab === 'payments'}>
              결제 내역
            </Tab>
            <Tab onClick={() => setTab('gallery')} role="tab" aria-label="gallery" aria-selected={tab === 'gallery'}>
              갤러리
            </Tab>
          </Tabs>
          <TabPanel role="tabpanel" hidden={tab === 'payments'}>
            <Stack spacing={2}>
              <Gallery />
              <Gallery />
              <Gallery />
              <Gallery />
            </Stack>
          </TabPanel>
          <TabPanel role="tabpanel" hidden={tab === 'gallery'}>
            <Stack spacing={2}>
              <Payment />
              <Payment />
              <Payment />
              <Payment />
            </Stack>
          </TabPanel>
        </TabContainer>
      </PetimegeThemeWH>
    </PetimageThemeBG>
  )
}


const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`


const Tab = styled.button`
  height: 100%;
  font-size: var(--h2);
  font-weight: bold;
  transition: .3s;
  color: #8f8f8f;
  position: relative;
  padding: var(--pd-md);
  :after {
    content: "";
    width: 100%;
    height: 0.375rem;
    position: absolute;
    background-color: var(--petimage);
    left: 0;
    bottom: 0;
    opacity: 0;
  }
  &[aria-selected="true"]{
    color: var(--petimage);
    span {
      color: var(--petimage);
    }
    ::after {
    opacity: 1;
    }
  }
`

const Tabs = styled(RoundPaper)`
  display: flex;
  width: 100%;
  flex-direction: row;
  max-width: 900px;
  margin-top: -50px;
  justify-content: space-around;
  align-items: center;
  margin-bottom: var(--gap-lg);
`


const TabPanel = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: var(--gap-lg);
`