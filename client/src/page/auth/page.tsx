import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLoginBtn from '../../components/GoogleLoginBtn';
import AppleLoginBtn from '../../components/AppleLoginBtn';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { SingleSection } from '../../components/Containers';

export default function Auth() {
  const navigate = useNavigate();

  return (
    <SingleSection>
      <Dialog
        open={true}
        onClick={() => navigate(-1)}
        aria-labelledby="login-dialog"
      >
        <DialogTitle id="login-dialog">로그인</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={(e) => {
            e.stopPropagation()
            navigate(-1)
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
    </SingleSection>
  )
}


const BtnWrapper = styled.div`
  display: flex;
  padding: 8px 16px;
  text-align: center;
`
