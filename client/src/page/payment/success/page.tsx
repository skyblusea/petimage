import { Typography } from "@mui/material";
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import styled from "@emotion/styled";
import { Link, Params } from "react-router-dom";
import { SingleSection } from "../../../components/Containers";
import { LinkButton } from "../../../components/LinkComponents";


export const loader = async ({ params, request }: { params : Params, request: Request }) => {
  console.log('sucess loader', params)
  console.log('sucess loader', request)
  return null
//   const response = await fetch("/confirm", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(requestData),
//   });

//   const json = await response.json();

//   if (!response.ok) {
//     // 결제 실패 비즈니스 로직을 구현하세요.
//     navigate(`/fail?message=${json.message}&code=${json.code}`);
//     return;
//   }

//   // 결제 성공 비즈니스 로직을 구현하세요.
// }
// confirm();
// }, []);
}

export const action = async ({ request }: { request: Request }) => {
  console.log('sucess action', request)
  return Promise.resolve()
}


export default function PaymentSuccess() {

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