import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { loadPaymentWidget, ANONYMOUS, PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useQuery } from "@tanstack/react-query"
import useAuth from '../../util/useAuth';
import { getPaymentId } from '../../util/getPaymentId';
import { useLocation } from 'react-router-dom';
import { AlbumDetails } from '../../types';


//위젯 로드
export const tossWidgetQuery = (customerkey: string) => ({
  queryKey: ['tossWidget', customerkey],
  queryFn: () => {
    return loadPaymentWidget(import.meta.env.VITE_TOSS_CLIENT_KEY, customerkey)
  },
  staleTime: 1000 * 60 * 60 * 24 // 1 days
})


export default function Checkout() {
  //결제 정보 불러오기
  const { state } = useLocation();
  const albumDetails = state as AlbumDetails;
  const user = useAuth().user ?? { id: '', name: '익명', email: ANONYMOUS }
  const authClient = useAuth().authClient
  //위젯 로드
  const { data: paymentWidget } = useQuery({
    ...tossWidgetQuery(user.id),
  })
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
  const amount = Number(albumDetails?.theme.price?.replaceAll(',', ''))
  //결제 동의
  const [agree, setAgree] = useState(false)

  useLayoutEffect(() => {
    if (!paymentWidget) {
      return;
    }
    // ------  결제 UI 렌더링 ------
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods("#payment-widget", { value: amount }, { variantKey: "DEFAULT" });
    // ------  이용약관 UI 렌더링 ------
    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, amount]);


  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;
    if (paymentMethodsWidget == null) {
      return;
    }
    // 결제 금액 업데이트
    paymentMethodsWidget.updateAmount(amount);
  }, [amount]);



  const handlePaymentRequest = async () => {
    try {
      const paymentInfo = {
        orderId: nanoid(),
        orderName: `${albumDetails!.theme.name}/${albumDetails!.theme.type}/${albumDetails!.theme.amount}장`, //우주여행/AI컨셉사진 theme type/amount장
        customerName: user.name,
        customerEmail: user.email,
      }
      // 서버에 paymentId 요청
      const paymentId = await getPaymentId({
        orderId: paymentInfo.orderId,
        amount: Number(albumDetails?.theme.price?.replaceAll(',', '')),
        authClient
      })
      if (!paymentId) {
        alert('주문 생성에 실패했습니다.')
        return
      }
      // 결제 요청 전 앨범 정보 로컬 저장
      localStorage.setItem('albumDetails', JSON.stringify(albumDetails));
      // 결제 요청
      await paymentWidget?.requestPayment({
        ...paymentInfo,
        successUrl: `${window.location.origin}/payment/${paymentId}`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  //TODO
  return (
    <Container>
      <DialogTitle component="h4" sx={{ fontWeight: "700" }}>구매 상품</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="space-between">
          <DialogContentText>
            {albumDetails?.theme.name} 테마 / {albumDetails?.theme.amount} 장
          </DialogContentText>
          <DialogContentText color="error">
            {albumDetails?.theme.price} 원
          </DialogContentText>
        </Box>
      </DialogContent>
      <div id="payment-widget" />
      <div id="agreement" />
      <TossCheckboxWrapper>
        <Tooltip title="결제 내용을 확인 후 동의해주세요." arrow open={true} placement="left">
          <TossCheckboxLabel htmlFor="agree">
            <TossCheckbox type="checkbox" id="agree" name="agree" value="agree" checked={agree} onChange={() => { setAgree(!agree) }} />
            <span>상기 결제 건에 대한 내용을 확인했습니다.</span>
          </TossCheckboxLabel>
        </Tooltip>
      </TossCheckboxWrapper>
      <Button
        onClick={handlePaymentRequest}
        endIcon={<ArrowForwardRoundedIcon />}
        variant="contained" color="petimage" disabled={!agree} sx={{ width: '100%' }}>결제하기</Button>
    </Container>
  )
}

const TossCheckboxLabel = styled.label`
  position: relative;
  display: inline-block;
  min-height: 24px;
  line-height: 1.6;
  padding-left: 24px;
  span{
  font-weight: 400;
  padding-left: 8px;
  line-height: 1.6;
  color: #4e5968;
  font-size: 15px;
  }
`

const TossCheckbox = styled.input`
  position: absolute;
  margin: 0 0 0 -24px;
  top: 4px;
  appearance: none;
  border: none;
  cursor: pointer;
  overflow: visible;
  :hover:before {
    border-color: rgb(49, 130, 246);
    background-color: #e8f3ff;
  }

  :checked:before {
    border-color: rgb(49, 130, 246);
    background-color: rgb(49, 130, 246);
  }

  :before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    border-radius: 6px;
    top: -4px;
    left: 0;
    width: 24px;
    height: 24px;
    border: 2px solid #d1d6db;
    background-color: #fff;
    transition: border-color .1s ease,background-color .1s ease;
    }

    :after {
      content: "";
      position: absolute;
      top: 3px;
      left: 5px;
      width: 14px;
      height: 10px;
      opacity: 0;
      background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.343 4.574l4.243 4.243 7.07-7.071' fill='transparent' stroke-width='2' stroke='%23FFF' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      transition: opacity .1s ease;
    }

    :checked:after {
      opacity: 1;
    }

`

const TossCheckboxWrapper = styled.div`
  margin-top: -16px;
  padding: 0 24px 24px 24px;
`
