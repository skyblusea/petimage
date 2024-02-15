import styled from "@emotion/styled"
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PaymentHistory } from "../../../types";
import { Stack } from '@mui/material';
// import countryToCurrency, { Countries } from "country-to-currency";

export default function Payment({ data }: { data: PaymentHistory}) {
  return (
    <PaymentBox color="primary.main">
      <PaymentWrapper>
        <Typography sx={{ typography: { xs: 'subtitle3', md: 'h6' } }} >{data.orderName}</Typography>
        <Typography sx={{ typography: { xs: 'subtitle3', md: 'h6' } }} color="petimage.main" >{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'KRW' }).format(data.totalAmount)}</Typography>
        {/* <Typography variant="h4" color="petimage.main" >{new Intl.NumberFormat(undefined, { style: 'currency', currency: countryToCurrency[data.country as Countries] }).format(data.totalAmount)}</Typography> */}
      </PaymentWrapper>
      <Divider flexItem />
      <PaymentWrapper>
        <Typography sx={{ typography: { xs: 'subtitle3', md: 'h6' } }} >승인 일자</Typography>
        <Typography sx={{ typography: { xs: 'body2', md: 'body1' } }} color="text.secondary" >{
          new Intl.DateTimeFormat(undefined, { // undefined 시 browser default locale
            dateStyle: 'long',
            timeStyle: 'medium'
          }).format(new Date(data.createdAt))
        }</Typography>
      </PaymentWrapper>
    </PaymentBox>
  );
}



const PaymentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`


export const PaymentBox = styled(Stack)` 
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: var(--border-radius-sm);
  padding: 12px 16px;
  width: 100%;
  gap: var(--gap-sm);
`
