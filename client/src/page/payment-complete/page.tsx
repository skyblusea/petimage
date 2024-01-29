import { Typography } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SingleSection } from "../../components/Containers";
import { LinkButton } from "../../components/LinkComponents";
import useAuth from "../../util/useAuth";
import { useContext, useEffect } from "react";
import { LoadingContext } from "../../provider/LoadingProvider";




export default function PaymentComplete() {
  const { setIsLoading } = useContext(LoadingContext)
  setIsLoading(true)
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
        setIsLoading(false)
        if (isAlbumCreated) {
          alert('결제가 완료되었습니다.')
          return navigate('/payment-complete')
        } else {
          alert('앨범 생성에 실패했습니다. 다시 시도해주세요.')
          //TODO : 결제취소 요청 추가
          return navigate('/create')
        }
      }
      setIsLoading(false)
      alert('결제에 실패했습니다. 다시 시도해주세요.')
      navigate(-1)
    }
    requestPayment()
  }, [])

  return (
    <SingleSection>
      <MsgContainer>
        <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'h4', md: 'h3', lg: 'h2' } }} gutterBottom>AI 사진 생성 중입니다.</Typography>
        <Msg>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>사진의 해상도나 정확도에 따라</Typography>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>약 4분 ~ 10분이 소요됩니다.</Typography>
        </Msg>
        <ButtonWrraper>
          <LinkButton component={Link} variant="contained" color="petimage" to="/collection" endIcon={<ArrowForwardRoundedIcon />}>보관함으로 이동하기</LinkButton>
          <LinkButton component={Link} variant="contained" color="petimage" to="/" endIcon={<ArrowForwardRoundedIcon />}>메인으로 이동하기</LinkButton>
        </ButtonWrraper>
      </MsgContainer>
    </SingleSection>
  )
}


const ButtonWrraper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`


const MsgContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`

const Msg = styled.div`
  display: flex;
  flex-direction: column;
`