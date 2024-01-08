import { Typography } from "@mui/material";
import { SingleSection } from "../../components/Containers";
import LinkButton from "../../components/LinkButton";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from "@emotion/styled";

export default function PaymentComplete() {
  return (
    <SingleSection>
      <MsgContainer>
        <Typography component="h4" sx={{ fontWeight: '700', typography: { xs: 'h4', md: 'h3', lg: 'h2' } }} gutterBottom>AI 사진 생성 중입니다.</Typography>
        <Msg>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>사진의 해상도나 정확도에 따라</Typography>
          <Typography sx={{ typography: { xs: 'subtitle2', md: 'subtitle1' } }}>약 4분 ~ 10분이 소요됩니다.</Typography>
        </Msg>
        <ButtonWrraper>
          <LinkButton variant="contained" color="petimage" to="/collection" endIcon={<ArrowForwardRoundedIcon />}>보관함으로 이동하기</LinkButton>
          <LinkButton variant="contained" color="petimage" to="/" endIcon={<ArrowForwardRoundedIcon />}>메인으로 이동하기</LinkButton>
        </ButtonWrraper>
      </MsgContainer>
    </SingleSection>
  )
}


const ButtonWrraper = styled.div`
  display: flex;
  gap: 1rem;
  
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