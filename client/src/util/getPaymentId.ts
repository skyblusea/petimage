import { AxiosInstance } from "axios";

export const getPaymentId = async ({ orderId, amount, authClient }: { orderId: string; amount: number, authClient:AxiosInstance }) => {
  try {
    // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
    // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
    const res = await authClient.post("/payment/new", { orderId, totalAmount :amount });
    if (res.status === 200) {
      const {
        data: { ok, data },
      } = res;
      if (ok) {
        const { _id: paymentId} = data;
        return paymentId as string;
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// res

// createdAt
// :
// "2024-01-23T06:32:35.635Z"
// orderId
// :
// "lDpXjQQ24XEipnLlcCpPE"
// totalAmount
// :
// 4900
// updatedAt
// :
// "2024-01-23T06:32:35.635Z"
// userId
// :
// "658a43a4e26d9227a64da419"
// __v
// :
// 0
// _id
// :
// "65af5d83f0fe7ecb555db046"
