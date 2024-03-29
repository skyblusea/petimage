import { Params } from "react-router-dom";
import { AlbumDetails } from "../types";


export const paymentLoader = async ({ params, request }: { params: Params, request: Request }) => {
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
  return {requestPaymentData, createAlbumData}
}


// res
// {
//   "data": {
//       "_id": "65b08f57e706fbeeadacbf0f",
//       "totalAmount": 4900,
//       "orderId": "ZKHlPHxZ52AcEHm0CUvPW",
//       "userId": "658a43a4e26d9227a64da419",
//       "createdAt": "2024-01-24T04:17:27.632Z",
//       "updatedAt": "2024-01-24T04:17:42.675Z",
//       "__v": 0,
//       "country": "KR",
//       "method": "가상계좌",
//       "orderName": "우주여행",
//       "receipt": "https://pgweb.tosspayments.com:9091/MpFlowCtrl?eventDiv1=search&eventDiv2=getCasReceiptList&trxid=tviva20240124131727Vdru6&SYSTEM=NEW"
//   },
//   "status": 200,
//   "statusText": "OK",
//   "headers": {
//       "content-length": "421",
//       "content-type": "application/json; charset=utf-8"
//   },
//   "config": {
//       "transitional": {
//           "silentJSONParsing": true,
//           "forcedJSONParsing": true,
//           "clarifyTimeoutError": false
//       },
//       "adapter": [
//           "xhr",
//           "http"
//       ],
//       "transformRequest": [
//           null
//       ],
//       "transformResponse": [
//           null
//       ],
//       "timeout": 0,
//       "xsrfCookieName": "XSRF-TOKEN",
//       "xsrfHeaderName": "X-XSRF-TOKEN",
//       "maxContentLength": -1,
//       "maxBodyLength": -1,
//       "env": {},
//       "headers": {
//           "Accept": "application/json, text/plain, */*",
//           "Content-Type": "application/json"
//       },
//       "baseURL": "https://petimage.kr/api/v1",
//       "method": "post",
//       "url": "/payment/toss",
//       "data": "{\"paymentId\":\"65b08f57e706fbeeadacbf0f\",\"orderId\":\"ZKHlPHxZ52AcEHm0CUvPW\",\"amount\":4900,\"paymentKey\":\"tviva20240124131727Vdru6\"}"
//   },
//   "request": {}
// }
