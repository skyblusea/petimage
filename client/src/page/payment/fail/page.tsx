import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';import { SingleSection } from "../../../components/Containers";
import ErrorIcon from '../../../assets/error.svg?react';

export default function PaymentFail() {


  return (
    <SingleSection center>
      <SvgIcon component={ErrorIcon} sx={{ fontSize: '10rem' }} />
      <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'subtitle2', md: 'subtitle1' } }}>결제에 실패했습니다.</Typography>
      <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'subtitle2', md: 'subtitle1' } }}>다시 시도해주세요.</Typography>
    </SingleSection>
  )
}