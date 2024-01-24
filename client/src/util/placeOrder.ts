import { authClient } from "./axiosInstance";
import { PaymentDetails } from "../types"

export const placeOrder = async (paymentId, orderId, amount, paymentKey) => {
  try {
    const res = await authClient.post("/payment/toss", {
      paymentId,
      orderId,
      amount,
      paymentKey
    })
    if(res.status === 200) {
      const { data : { ok, data} } = res;
      if(ok) {
        console.log('placeorder',data);
      }else
      return false
    }
  }catch (error) {
    console.log(error);
    throw error;
  }
};
