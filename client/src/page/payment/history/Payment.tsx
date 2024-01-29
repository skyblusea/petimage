import { CollectionBox } from "../../../components/Boxes";
import styled from "@emotion/styled"
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { PaymentHistory } from "../../../types";
// import countryToCurrency, { Countries } from "country-to-currency";


export default function Payment({ data }: { data: PaymentHistory}) {
  return (
    <CollectionBox>
      <PaymentWrapper>
        <Typography variant="h4" >{data.orderName}</Typography>
        <Typography variant="h4" color="petimage.main" >{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'KRW' }).format(data.totalAmount)}</Typography>
        {/* <Typography variant="h4" color="petimage.main" >{new Intl.NumberFormat(undefined, { style: 'currency', currency: countryToCurrency[data.country as Countries] }).format(data.totalAmount)}</Typography> */}
      </PaymentWrapper>
      <Divider flexItem />
      <PaymentWrapper>
        <Typography variant="h4" >승인 일자</Typography>
        <Typography variant="h4" color="text.secondary" >{
          new Intl.DateTimeFormat(undefined, { // undefined 시 browser default locale
            dateStyle: 'long',
            timeStyle: 'medium'
          }).format(new Date(data.createdAt))
        }</Typography>
      </PaymentWrapper>
    </CollectionBox>
  );
}



const PaymentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`