import { Navigate, Params, useLoaderData } from "react-router-dom";
import { AlbumDetails } from "../../types";



export const loader = async ({ params, request }: { params: Params, request: Request }) => {
  //http://localhost:5173/payment/65b089b66221ce116b9a3595?paymentType=NORMAL&orderId=lndSgzfmF_MshGZ65WJ3Y&paymentKey=tviva20240124125326RKM44&amount=4900
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


export default function Redirect () {
  const data = useLoaderData()
  console.log('Redirect data', data)
  
  return <Navigate to="/payment" replace={true} state={data}/>
}