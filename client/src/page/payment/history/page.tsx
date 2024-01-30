import { PetimageThemeContainer, PetimegeThemeWH, RoundPaper } from "../../../components/Containers";
import styled from "@emotion/styled"
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useLoaderData, useLocation } from "react-router-dom";
import { AxiosInstance } from "axios";
import useAuth from "../../../util/useAuth";
import { PaymentHistory } from "../../../types";
import { Stack } from "@mui/material";
import Payment from "./Payment";
import { Tab, TabContainer, TabPanel, Tabs } from "../../collection/page";




const paymentHistoryQuery = (authClient: AxiosInstance) => ({
  queryKey: ['paymentHistory'],
  queryFn: async () => {
    try {
      const { data: { data: { payments: paymentHistory } } } = await authClient.get(`/payment/list?sort=&order=&limit=&page=`)
      return paymentHistory as PaymentHistory[]
    } catch (error) {
      console.error('paymentHistoryQuery error', error)
      throw error
    }
  },
  staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
});


export const loader = (queryClient: QueryClient, authClient: AxiosInstance) =>
  async () => {
    const query = paymentHistoryQuery(authClient);
    try {
      const data = await queryClient.fetchQuery(query)
      return data;
    } catch (error) {
      queryClient.removeQueries(query);
      return null;
    }
  }




export default function PaymentHistory() {
  const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
  const { authClient, isAuthenticated } = useAuth()
  const { data: payments } = useQuery({
    ...paymentHistoryQuery(authClient),
    initialData: initialData ? initialData : undefined,
    enabled: isAuthenticated,
  })
  const pathname = useLocation().pathname

  return (
    <PetimageThemeContainer>
      <PetimegeThemeWH full>
        <TabContainer>
          <Tabs elevation={3}>
            <Tab role="tab" aria-label="payments" aria-selected={pathname === '/payment/history'}>
              결제 내역
            </Tab>
          </Tabs>
          <TabPanel role="tabpanel" hidden={pathname === '/collection'}>
            <Stack spacing={2}>
              {payments?.map((payment) => <Payment key={payment._id} data={payment} />)}
            </Stack>
          </TabPanel>
        </TabContainer>
      </PetimegeThemeWH>
    </PetimageThemeContainer>
  )
}

