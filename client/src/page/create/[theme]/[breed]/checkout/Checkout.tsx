import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { LinkButton } from '../../../../components/LinkButtons';
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';


export default function Checkout() {

  const [agree, setAgree] = useState(false)
  const widgetClientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
  const customerKey = "DImXqF5T0UgxfpA_DROI4";
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const [price, setPrice] = useState(50_000);

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

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    try {
      await paymentWidget?.requestPayment({
        orderId: nanoid(),
        orderName: "토스 티셔츠 외 2건",
        customerName: "김토스",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success`,
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
            스쿠버다이빙 테마 / 30장
          </DialogContentText>
          <DialogContentText color="error">
            5,900원
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
      <LinkButton
        component={Link}
        to="/payment-complete"
        endIcon={<ArrowForwardRoundedIcon />}
        variant="contained" color="petimage" disabled={!agree} sx={{ width: '100%' }}>결제하기</LinkButton>
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
