import { PetimageThemeContainer, PetimegeThemeHeader, PetimegeThemeContent } from "../../../components/Containers";
import { useQuery } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
import { AxiosInstance } from "axios";
import useAuth from "../../../util/useAuth";
import { PaymentHistory } from "../../../types";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Payment from "./Payment";



const paymentHistoryQuery = (authClient: AxiosInstance) => ({
  queryKey: ['paymentHistory'],
  queryFn: async () => {
    const { data: { data: { payments: paymentHistory } } } = await authClient.get(`/payment/list?sort=&order=&limit=&page=`)
    return paymentHistory as PaymentHistory[]
  },
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

  return (
    <PetimageThemeContainer>
      <PetimegeThemeHeader>
        <Box display="flex" flexGrow={1}>
          <Typography variant="h4" color="secondary">결제 내역</Typography>
        </Box>
      </PetimegeThemeHeader>
      <PetimegeThemeContent full>
        {payments && payments.length > 0
          ? <Stack spacing={2}>{payments.map((payment) => <Payment key={payment._id} data={payment} />)}</Stack>
          : <Typography variant="h6">결제 내역이 없습니다.</Typography>
        }
      </PetimegeThemeContent>
    </PetimageThemeContainer>
  )
}

