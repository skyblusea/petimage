import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLoginBtn from './GoogleLoginBtn';
import AppleLoginBtn from './AppleLoginBtn';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import LinkButton from './LinkButton';
import { Typography } from '@mui/material';


export default function LoginModal({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {


  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log('useGoogleLogin response', codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      aria-labelledby="login-dialog"
    >
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <IconButton
        aria-label="close" onClick={() => setIsOpen(!isOpen)}
        sx={{ position: 'absolute', right: '8px', top: '8px' }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Typography variant='body1'>@react-oauth/google</Typography>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log('@react-oauth', credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        <Button
          onClick={() => login()}
          variant="contained">로그인</Button>
        <Typography variant='body1'>이전 서비스 버전</Typography>
        <a href={`${import.meta.env.VITE_GOOGLE_OAUTH2}`}>구글 로그인</a>
        <Typography variant='body1'>sdk version</Typography>
        <GoogleLoginBtn />
        <Typography variant='body1'>@react-oauth/google useGoogleLogin 리다이렉트 url</Typography>
        <LinkButton to='https://accounts.google.com/signin/oauth/consent?authuser=0&part=AJi8hANkPfP6e-gl7NoAWhs6lBuz78bFyBlLQx4kLMi3irHV4OAI9Cu2T6iyVoL9S5zZTisKMuneo3am-h_cl7PEaQEF4NQjzLgnku3LYxDetk47ibIFLDbk-ZtwxolpTLx9OYLnYWwyx10iLOOKGI2l4mqzvCs90eL7IB2iV9hfzEiSaGPTQxKH27JW3h_99lzn7WGC8M-baew8XjnZAT_C_WESP9zhUvjXBrLrIxVJ2szdiulrHgKwMxmFjoZoTx_SdD85clYJys3GvIwYoDxJjtsqosyzcDn60V219AhuwGbPEDlcl8p_m98pXBClx2cZikMMH5MpjpU9fW_626YDo2ct9w3aaOreM5rmNi9Neumo0Htw1VEWpQ_jA5CYU9Mxw1eVIX2nzIfKBnj161Y8uyRjh9vx7-ldS3ILQlQOCKKU-lOKmPPx7MqligyOlEncPJiQ_XgwITYCcJOliMj8fzfBj1dkkw&as=S1661833633%3A1704788121425142&client_id=175379310017-4ragcgo3op07ck6ppmq05rvovk10gnsk.apps.googleusercontent.com&theme=glif&pli=1&rapt=AEjHL4PLcRePgkN128LvEgPl-dWtY0lM9bkkpSXTPdleRRs8fgxi4adks53bVbIYH0rk2Utl2DylxmisXP0hLh-hZbSLEirGKw#
          '>구글 로그인4</LinkButton>
        <AppleLoginBtn />
        <Typography variant='body1'>test</Typography>
        <Button
          onClick={() => test()}
          variant="contained">테스트</Button>
        <AppleLoginBtn />
      </DialogContent>
      <BtnWrapper>
        <Button variant='text' sx={{ color: 'var(--black)' }}>이용약관</Button>
        <Button variant='text' sx={{ color: 'var(--black)' }}>개인정보처리방침</Button>
      </BtnWrapper>
    </Dialog>
  )
}


const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  text-align: center;
`


const LoginBtn = styled.div`
  display: flex;
`

const test = async () => {
  const params = {
  'client_id': import.meta.env.VITE_GOOGLE_CLIENT_ID,
  'redirect_uri': 'http://localhost:5173',
  'response_type': 'token',
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ].join(" "),  
  'include_granted_scopes': 'true',
  'state': 'pass-through value'//현재 url 로 다시 돌아올때 파라미터로 전달되는 값
  }
  
  const qs = new URLSearchParams(params);
  console.log('qs', qs);

  const res = await axios.get(`https://accounts.google.com/o/oauth2/v2/auth`,)
  console.log('테스트', res);
}
