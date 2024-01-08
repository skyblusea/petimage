import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import GoogleLoginBtn from './GoogleLoginBtn';
import AppleLoginBtn from './AppleLoginBtn';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { DialogActions } from '@mui/material';

export default function NoticeModal({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {


  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(!isOpen)}
      aria-labelledby="login-dialog"
      sx={{}}
    >
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <IconButton
        aria-label="close" onClick={() => setIsOpen(!isOpen)}
        sx={{ position: 'absolute', right: '8px', top: '8px' }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <GoogleLoginBtn />
        <AppleLoginBtn />
      </DialogContent>
    </Dialog>
  )
}
