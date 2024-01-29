import { Typography } from "@mui/material";
import { SingleSection } from "../../../components/Containers";
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';

export default function PaymentFail() {


  return (
    <SingleSection>
      <CreditCardOffOutlinedIcon sx={{ fontSize: '10rem' }} />
      <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'subtitle2', md: 'subtitle1' } }}>결제에 실패했습니다.</Typography>
      <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'subtitle2', md: 'subtitle1' } }}>다시 시도해주세요.</Typography>
    </SingleSection>
  )
}