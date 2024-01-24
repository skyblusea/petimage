
import { PetimageThemeBG, PetimegeThemeWH, RoundPaper } from "../../components/Containers";
import styled from "@emotion/styled"
import Payment from "./Payment";
import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Album from "./Album";
import { QueryClient } from "@tanstack/react-query";
import { useLoaderData, useLocation } from "react-router-dom";
import { AlbumItem, Payment as PaymentType } from "../../types";
import { authClient } from "../../util/axiosInstance";




const collectionQuery = () => ({
  queryKey: ["collection"],
  queryFn: async ():Promise<{payments: PaymentType[]; album: AlbumItem[]}> => {
    try {
      const { data: { data: { payments } } } = await authClient.get(`/payment/list?sort=&order=&limit=&page=`)
      const { data: { data: album } } = await authClient.get(`/album/list?sort=&order=&limit=&page=`);
      return { payments, album }
    } catch (error) {
      console.error('collectionQuery error')
      throw error
    }
  },
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});


export const loader =
  (queryClient: QueryClient) =>
    async () => {
      const query = collectionQuery()
      const data = queryClient.ensureQueryData(query)
      return data;
    }



export default function Collection() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>;
  const { data : { payments, album } } = useQuery({
    ...collectionQuery(),
    initialData,
  })
  const pathname = useLocation().pathname

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
          <TabPanel role="tabpanel" hidden={pathname === '/collection'}>
            <Stack spacing={2}>
              {payments?.map((payment) => <Payment key={payment._id} data={payment} />)
              }
            </Stack>
          </TabPanel>
          <TabPanel role="tabpanel" hidden={pathname === '/payments'}>
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