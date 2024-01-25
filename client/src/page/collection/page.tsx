
import { PetimageThemeBG, PetimegeThemeWH, RoundPaper } from "../../components/Containers";
import styled from "@emotion/styled"
import Payment from "./Payment";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Album from "./Album";
import { QueryClient } from "@tanstack/react-query";
import { useLoaderData, useLocation } from "react-router-dom";
import { AlbumItem, Payment as PaymentType } from "../../types";
import { AxiosInstance } from "axios";
import useAuth from "../../util/useAuth";





const collectionQuery = (authClient:AxiosInstance) => ({
  queryKey: ["collection",authClient],
  queryFn: async () => {
    try {
      console.log('collectionQuery작동')
      const { data: { data: { payments } } } = await authClient.get(`/payment/list?sort=&order=&limit=&page=`) 
      const { data: { data: albums } } = await authClient.get(`/album/list?sort=&order=&limit=&page=`)
      return { payments, albums }
    } catch (error) {
      console.error('collectionQuery error')
      return null
    }
  },
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});


export const loader = (queryClient: QueryClient, authClient:AxiosInstance) =>
  () => {
    const query = collectionQuery(authClient)
    const data = queryClient.ensureQueryData(query)
    return data;
  }



export default function Collection() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  // console.log('initialData', initialData ? initialData : undefined)
  const authClient = useAuth().authClient
  const { data } = useQuery({
    ...collectionQuery(authClient),
  })
  const pathname = useLocation().pathname
  // const { payments, albums } = data
  // if(!data) return 
  return (
    <PetimageThemeBG>
      <PetimegeThemeWH full>
        <TabContainer>
          <Tabs elevation={3}>
            <Tab role="tab" aria-label="payments" aria-selected={pathname === '/payments'}>
              결제 내역
            </Tab>
            <Tab role="tab" aria-label="album" aria-selected={pathname === '/collection'}>
              갤러리
            </Tab>
          </Tabs>
          {/* <TabPanel role="tabpanel" hidden={pathname === '/collection'}>
            <Stack spacing={2}>
              {payments?.map((payment) => <Payment key={payment._id} data={payment} />)}
            </Stack>
          </TabPanel> */}
          {/* <TabPanel role="tabpanel" hidden={pathname === '/payments'}>
            <Stack spacing={2}>
              {albums?.map((album) => <Album key={album._id} data={album} />)}
            </Stack>
          </TabPanel> */}
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