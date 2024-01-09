import { CollectionBox } from "../../components/Boxes";
import styled from "@emotion/styled"
import { Divider } from "@mui/material";
import Typography from '@mui/material/Typography';


export default function Payment() {
  return (
    <CollectionBox>
      <PaymentWrapper>
        <Typography variant="h4" >컨셉사진 / 우주비행사 / 30장</Typography>
        <Typography variant="h4" color="petimage.main" >5,900원</Typography>
      </PaymentWrapper>
      <Divider />
      <PaymentWrapper>
        <Typography variant="h4" >승인 일자</Typography>
        <Typography variant="h4" color="text.secondary" >2023.11.28 오후 5:52:37</Typography>
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