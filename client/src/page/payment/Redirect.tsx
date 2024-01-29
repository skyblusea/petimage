import { Navigate, Params, useLoaderData } from "react-router-dom";
import { AlbumDetails } from "../../types";



export const loader = async ({ params, request }: { params: Params, request: Request }) => {
  const { paymentId } = params
  const searchParams = new URL(request.url).searchParams;
  const { orderId, paymentKey, amount } = Object.fromEntries(searchParams.entries())
  const requestPaymentData = {
    orderId,
    amount : Number(amount),
    paymentKey,
    paymentId
  }
  const createAlbumData =  JSON.parse(localStorage.getItem('albumDetails')??'') as AlbumDetails
  localStorage.removeItem('albumDetails')
  return { requestPaymentData, createAlbumData }
}

//http://localhost:5173/payment/65b089b66221ce116b9a3595?paymentType=NORMAL&orderId=lndSgzfmF_MshGZ65WJ3Y&paymentKey=tviva20240124125326RKM44&amount=4900
// 와 같이 결제 승인을 위한 데이터가 
// 결제 승인을 위한 post 요청동안 url로 일정시간 이상 노출 되는 것을 방지하고자
// loader에서 catch 후 바로 redirect를 하도록 함

export default function Redirect () {
  const data = useLoaderData()  
  return <Navigate to="/payment" replace={true} state={data}/>
}