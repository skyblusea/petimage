import { useEffect } from "react"
import { Navigate, redirect, useLocation, useNavigate, useRouteLoaderData } from "react-router-dom"
import useAuth from "../../util/useAuth"


export default function Payment() {

  const { createAlbumData, requestPaymentData } = useLocation().state
  const { authClient } = useAuth()
  const navigate = useNavigate()
  console.log('createAlbumData', createAlbumData)
  console.log('requestPaymentData', requestPaymentData)
  useEffect(() => {
    const requestPayment = async () => {
      const paymentGranted = await authClient.post("/payment/toss", requestPaymentData);
      if (paymentGranted.status === 200) {
        const isAlbumCreated = await authClient.post("/album/new", {
          themeId: createAlbumData.theme.themeId,
          animalCode: createAlbumData.animalCode,
          inputFiles: createAlbumData.inputFiles
        })
        if (isAlbumCreated) {
          alert('결제가 완료되었습니다.')
          return navigate('/payment-complete')
        } else {
          alert('앨범 생성에 실패했습니다. 다시 시도해주세요.')
          //TODO : 결제취소 요청 추가
          return navigate('/create')
        }
      }
      alert('결제에 실패했습니다. 다시 시도해주세요.')
      navigate(-1)
    }
    requestPayment()
  }, [])

  return null
}
