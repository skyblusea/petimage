import { createContext, useReducer } from "react"
import { PaymentDetails, AlbumDetails, RedirectDate } from "../types"
import { authClient } from "../util/axiosInstance";
import { PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";

interface OrderContextType {
  setAlbumDetails: (albumDetails: AlbumDetails) => void
  createOrder: ( paymentDetails: PaymentDetails, paymentWidget: PaymentWidgetInstance) => Promise<boolean>
  albumDetails: AlbumDetails | null
  paymentDetails: PaymentDetails | null
  paymentId: string | null
  placeOrder: (redirectData: RedirectDate) => Promise<void>
}

const initialContextState: OrderContextType = {
  setAlbumDetails: () => { },
  createOrder: () => Promise.resolve(false),
  albumDetails: null,
  paymentDetails: null,
  paymentId: null,
  placeOrder: () => Promise.resolve()
}

export const PaymentContext = createContext<OrderContextType>(initialContextState)




type OrderAction =
  | { type: 'setAlbumDetails', albumDetails: AlbumDetails }
  | { type: 'createOrder', paymentDetails: PaymentDetails }
  | { type: 'setPaymentId', paymentId: string }



type OrderState = {
  albumDetails: AlbumDetails | null,
  paymentDetails: PaymentDetails | null,
  paymentId: string | null
  paymentKey: string | null
};

const initialReducerState: OrderState = {
  albumDetails: null,
  paymentDetails: null,
  paymentId: null,
  paymentKey: null
};

const orderReducer = (state: OrderState, action: OrderAction) => {
  switch (action.type) {
    case "setAlbumDetails":
      return { ...state, albumDetails: action.albumDetails };
    case "createOrder":
      return { ...state, paymentDetails: action.paymentDetails };
    case "setPaymentId":
      return { ...state, paymentId: action.paymentId };
    default:
      return state;
  }
};





export default function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, initialReducerState);

  const { albumDetails, paymentDetails, paymentId } = state

  const setAlbumDetails = (albumDetails: AlbumDetails) => {
    dispatch({ type: 'setAlbumDetails', albumDetails })
  }

  const createOrder = async (paymentDetails: PaymentDetails, paymentWidget: PaymentWidgetInstance) => {
    dispatch({ type: 'createOrder', paymentDetails })
    const { orderId, orderName, customerName, customerEmail, amount } = paymentDetails
    try {
      // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
      // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
      const res = await authClient.post("/payment/new", { orderId, amount })
      if (res.status === 200) {
        const { data: { ok, data } } = res;
        if (ok) {
          const { _id: paymentId } = data
          dispatch({ type: 'setPaymentId', paymentId })
          await paymentWidget?.requestPayment({
            orderId,
            orderName,
            customerName,
            customerEmail,
            successUrl: `${window.location.origin}/payment/success`,
            failUrl: `${window.location.origin}/payment/fail`,
          });
        }else alert('주문 생성에 실패했습니다')
      }
      return false
    } catch (error) {
      console.log(error);
      return false
    }
  };

  const placeOrder = async (redirectData: RedirectDate) => {
    console.log('placeorder', redirectData)
    if (redirectData.orderId !== paymentDetails?.orderId || Number(redirectData.amount) !== paymentDetails?.amount) {
      alert('결제 요청한 정보와 일치하지 않습니다.')
      return
    }
    try {
      const res = await authClient.post("/payment/toss", {
        paymentId: paymentId,
        orderId: paymentDetails?.orderId,
        amount: paymentDetails?.amount,
        paymentKey: redirectData.paymentKey
      })
      if (res.status === 200) {
        const { data: { ok, data } } = res;
        if (ok) {
          console.log('placeorder', data);
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };



  const context = {
    albumDetails,
    setAlbumDetails,
    createOrder,
    paymentDetails,
    paymentId,
    placeOrder
  }





  return (
    <PaymentContext.Provider value={context}>
      {children}
    </PaymentContext.Provider>
  )
}

