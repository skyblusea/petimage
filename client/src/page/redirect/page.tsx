import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { AlbumDetails } from "../../types"
import { createAlbum } from "../../util/createAlbum"
import useAuth from "../../util/useAuth"

export default function Redirect () {
  const { paymentId } = useParams()
  const [searchParams] = useSearchParams()
  const { orderId, paymentKey, amount } = Object.fromEntries(searchParams.entries())
  const redirectData = {
    orderId,
    amount,
    paymentKey
  }
  const navigate = useNavigate()
  const token = useAuth().token.access
  console.log('token', token)
  const { authClient } = useAuth()

  useEffect(() => {
    const requestPayment = async (paymentId:string, redirectData:{
      orderId: string;
      amount: string;
      paymentKey: string;
    }) => {
      //http://localhost:5173/payment/65b089b66221ce116b9a3595?paymentType=NORMAL&orderId=lndSgzfmF_MshGZ65WJ3Y&paymentKey=tviva20240124125326RKM44&amount=4900
      try {
        const albumDetails = JSON.parse(localStorage.getItem('albumDetails')??'') as AlbumDetails
        console.log('albumDetails', albumDetails)
        if(!albumDetails){
          alert('생성할 이미지 정보가 없습니다. 다시 시도해주세요.')
          return navigate('/create')
        }
        const res = await authClient.post("/payment/toss", {
          paymentId,
          ...redirectData,
          amount: Number(redirectData.amount),
        });
        if (res.status === 200) {
          const isCreated = createAlbum(albumDetails, token, authClient)
          if(!isCreated){
            alert('앨범 생성에 실패했습니다. 다시 시도해주세요.')
            //TODO : 결제취소 요청 추가
            return navigate('/create')
          }else{
            alert('결제가 완료되었습니다.')
            return navigate('/payment-complete')
          }
        }else {
          alert('결제에 실패했습니다. 잠시 후 다시 시도해주세요.')
          return navigate('/checkout')
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    if(!paymentId) return
    requestPayment(paymentId, redirectData)
  }, [])
  return null
}


