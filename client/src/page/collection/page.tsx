
import { PetimageThemeBG, PetimegeThemeWH } from "../../components/Containers";
import styled from "@emotion/styled"
import { RoundPaper } from "../create/[animal]/notice/page";
import Payment from "./Payment";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { albumQuery, paymentQuery } from "../../util/loaders/collectionLoader";
import { useState } from "react";
import Album from "./Album";

export default function Collection() {
  const [tab, setTab] = useState<'payments' | 'album'>('payments')
  const payments = useQuery(paymentQuery()).data
  const album = useQuery(albumQuery()).data
  console.log(tab)
  return (
    <PetimageThemeBG>
      <PetimegeThemeWH full>
        <TabContainer>
          <Tabs elevation={3}>
            <Tab onClick={() => setTab('payments')} role="tab" aria-label="payments" aria-selected={tab === 'payments'}>
              결제 내역
            </Tab>
            <Tab onClick={() => setTab('album')} role="tab" aria-label="album" aria-selected={tab === 'album'}>
              갤러리
            </Tab>
          </Tabs>
          <TabPanel role="tabpanel" hidden={tab === 'album'}>
            <Stack spacing={2}>
              {payments?.map((payment) => <Payment key={payment._id} data={payment} />)
              }
            </Stack>
          </TabPanel>
          <TabPanel role="tabpanel" hidden={tab === 'payments'}>
            <Stack spacing={2}>
              {album?.map((album) => <Album key={album._id} data={album} />)}
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
  transform: translateY(calc(-50% - 40px));
  display: flex;
  width: 100%;
  flex-direction: row;
  max-width: 900px;
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