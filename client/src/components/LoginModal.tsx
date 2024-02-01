import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLoginBtn from './GoogleLoginBtn';
import AppleLoginBtn from './AppleLoginBtn';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { SingleSection } from './Containers';
import { isMobile } from 'react-device-detect';
import useAuth from '../util/useAuth';

export default function LoginModal() {
  const navigate = useNavigate();
  const { setLoginModal } = useAuth()
  const handleLoginClose = () => setLoginModal(false)

  return (
    <Dialog
      sx={{ width: '100% !important' }}
      open={true}
      aria-labelledby="login-dialog"
      onClose={handleLoginClose}
    >
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={(e) => {
          e.stopPropagation()
          handleLoginClose()
        }}
        sx={{ position: 'absolute', right: '8px', top: '8px' }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--gap-md)',
      }}>
        <GoogleLoginBtn />
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
  padding: 8px 16px;
  text-align: center;
`
