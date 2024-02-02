import { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useAuth from "../../util/useAuth"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { SingleSection } from "../../components/Containers";
import { Typography } from "@mui/material";
import { LoadingContext } from "../../provider/LoadingProvider";
import axios from "axios";

export default function Payment() {
  const { setIsLoading } = useContext(LoadingContext)
  const { createAlbumData, requestPaymentData } = useLocation().state
  const { authClient } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    setIsLoading(true)
    const requestPayment = async () => {
      try {
        const paymentGranted = await authClient.post("/payment/toss",requestPaymentData);
        if (paymentGranted.status === 200) {
          const isAlbumCreated = await authClient.post("/album/new", {
            themeId: createAlbumData.theme.themeId,
            animalCode: createAlbumData.animalCode,
            inputFiles: createAlbumData.inputFiles
          })
          if (isAlbumCreated) {
            alert('결제가 완료되었습니다.')
            setIsLoading(false)
            return navigate('/payment-complete')
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // axios에서 발생한 error
          // const { url } = error.config as AxiosError['config']
          // if(url.includes('album/new')){
          //   alert('앨범 생성에 실패했습니다. 다시 시도해주세요.')
          //   setIsLoading(false)
          //   //TODO : 결제취소 요청 추가
          //   return navigate(-1)
          // }
          alert('결제 승인에 실패했습니다. 다시 시도해주세요.')
          setIsLoading(false)
          return navigate(-1)
        }
      }
    }
    requestPayment()
  }, [])

  return (
    <SingleSection center>
      <CreditCardIcon sx={{ fontSize: '10rem' }} />
      <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'subtitle2', md: 'subtitle1' } }}>결제를 진행중입니다.</Typography>
    </SingleSection>
  )
}
