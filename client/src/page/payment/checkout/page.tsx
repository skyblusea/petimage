import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import { Link, redirect, useActionData, useLocation } from 'react-router-dom';
import { getThemeDetails } from '../../../util/getThemeDetails';
import { LinkButton } from '../../../components/LinkComponents';
import { AuthContext } from '../../../provider/AuthProvider';
import { Button } from '@mui/material';





export const action = async ({ request }: { request: Request }) => {
    const formData = await request.formData()
    const { themeId, animalCode } = Object.fromEntries(formData.entries())
    const inputFiles = formData.getAll('inputFiles')
    const themeDetails = await getThemeDetails(themeId);
    if(!themeDetails) {
      return redirect('/create')
    }
    const paymentDetails = { 
      theme : {
        id : themeId,
        name : themeDetails.name,
        price : themeDetails.price,
      },
      animalCode : animalCode,
      inputFiles : inputFiles,
    }
    return paymentDetails
  }

const loader = () => {

}

export default function Checkout() {
  // const data = useActionData()
  const { state : paymentDatails } = useLocation()
  console.log('paymentDatails',paymentDatails)
  const { theme, animalCode, inputFiles } = paymentDatails
  const priceNumber = Number(theme.price?.replaceAll(',', ''))
  const { user } = useContext(AuthContext) ?? { name: '익명', email: ANONYMOUS }
  const [agree, setAgree] = useState(false)

  const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = "DImXqF5T0UgxfpA_DROI4";
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  
  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(widgetClientKey, customerKey);
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useLayoutEffect(() => {
    if (paymentWidget == null) {
      return;
    }
    // 결제창 렌더링
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: priceNumber },
      { variantKey: "DEFAULT" }
    );
    // 결제약관 렌더링
    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, priceNumber]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(priceNumber);
  }, [priceNumber]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: theme.name,
        customerName: user?.name || "익명",
        customerEmail: user?.email || ANONYMOUS,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/fail`,
        _skipAuth: "FORCE_SUCCESS",
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };


  return (
    <>
      <DialogTitle component="h4" sx={{ fontWeight: "700" }}>구매 상품</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" justifyContent="space-between">
          <DialogContentText>
            {theme.name} 테마 / {theme.amount} 장
          </DialogContentText>
          <DialogContentText color="error">
            {theme.price} 원
          </DialogContentText>
        </Box>
      </DialogContent>
      <div id="payment-widget" />
      <div id="agreement" />
      <TossCheckboxWrapper>
        <Tooltip title="결제 내용을 확인 후 동의해주세요." arrow>
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
    </>
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
