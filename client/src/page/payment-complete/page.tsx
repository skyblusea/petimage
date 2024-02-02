import { Typography } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { RoundPaper, SingleSection } from "../../components/Containers";
import { LinkButton } from "../../components/LinkComponents";
import Loading from "../../components/Loading";
import Box from '@mui/material/Box';



export default function PaymentComplete() {

  return (
    <SingleSection center>
      <MsgContainer>
        <RoundPaper3 elevation={5}>
          <Typography component="h4" color="petimage.main" sx={{ fontWeight: '700', fontSize: '40px' }} gutterBottom>AI 사진 생성 중입니다.</Typography>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>사진의 해상도나 정확도에 따라<br />약 4분 ~ 10분이 소요됩니다.</Typography>
          <Box sx={{m: '-50px 0'}}>
            <Loading />
          </Box>
          <ButtonWrraper>
            <LinkButton component={Link} variant="outlined" to="/collection" endIcon={<ArrowForwardRoundedIcon />}>보관함으로 이동하기</LinkButton>
            <LinkButton component={Link} variant="outlined" to="/" endIcon={<ArrowForwardRoundedIcon />}>메인으로 이동하기</LinkButton>
          </ButtonWrraper>
        </RoundPaper3>
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

const RoundPaper3 = styled(RoundPaper)`
  padding: var(--pd-lg);
`