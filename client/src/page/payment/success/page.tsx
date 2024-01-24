import { Button, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from "@emotion/styled";
import { Link, Params, useParams, useSearchParams } from "react-router-dom";
import { SingleSection } from "../../../components/Containers";
import { LinkButton } from "../../../components/LinkComponents";
import { useContext, useEffect } from "react";
import { PaymentContext } from "../../../provider/OrderProvider";



export const loader = async ({ params, request }: { params : Params, request: Request }) => {
  console.log('sucess loader', params)
  console.log('sucess loader', request)
  // "http://localhost:5173/payment/success?paymentType=NORMAL&orderId=K64GTJSEgCQ_quD8d0xVU&paymentKey=tviva20240123153745WE8W4&amount=4900"

  return null
}


  
export const action = async ({ request }: { request: Request }) => {
  console.log('sucess action', request)
  return Promise.resolve()
}


export default function PaymentSuccess() {
  const { paymentId } = useParams()
  console.log('paymentId', paymentId)
  const [searchParams] = useSearchParams()
  console.log('searchParams', searchParams)
  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.  
    const redirectData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };
    // placeOrder(redirectData)
  }
  ,[])
  
  const clickHandler = async() => {
  }

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await placeOrder(paymentDetails?.paymentId, paymentDetails?.orderId, paymentDetails?.amount, paymentDetails?.paymentKey)

    } catch (error) {
      console.error("Error requesting payment:", error);
    }

  };

  return (
    <SingleSection>
      <MsgContainer>
        <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'h4', md: 'h3', lg: 'h2' } }} gutterBottom>AI 사진 생성 중입니다.</Typography>
        <Msg>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>사진의 해상도나 정확도에 따라</Typography>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>약 4분 ~ 10분이 소요됩니다.</Typography>
        </Msg>
        <ButtonWrraper>
          <LinkButton component={Link} variant="contained" color="petimage" to="/collection" endIcon={<ArrowForwardRoundedIcon />}>보관함으로 이동하기</LinkButton>
          <LinkButton component={Link} variant="contained" color="petimage" to="/" endIcon={<ArrowForwardRoundedIcon />}>메인으로 이동하기</LinkButton>
        </ButtonWrraper>
        <Button
        onClick={handlePaymentRequest}
        >수동전송해보자</Button>
      </MsgContainer>
    </SingleSection>
  )
}


const ButtonWrraper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`


const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`

const Msg = styled.div`
  display: flex;
  flex-direction: column;
`