import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import { LinkMenuItem } from './LinkComponents';
import Menu from '@mui/material/Menu';
import useAuth from '../util/useAuth';


export default function MenuModal({
  anchorEl,
  setAnchorEl
}: {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}) {
  const pathname = useLocation().pathname
  const { logout } = useAuth()

  return (
    <Menu
      disableScrollLock={true}
      id="user-menu"
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)} // close menu
      open={!!anchorEl}
      sx={{
        '& .MuiPaper-root': {
          marginTop: 'var(--gap-sm)'
        }
      }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 50,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }
      }}

    >
      <LinkMenuItem
        component={Link}
        to="/payment/history"
        selected={pathname === '/payment/history'}
      >
        <ListItemIcon>
          <Avatar sx={{ bgcolor: 'petimage.main' }}>
            <ReceiptOutlinedIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText>결제 내역</ListItemText>
      </LinkMenuItem>
      <LinkMenuItem
        to="/collection"
        component={Link}
        selected={pathname === '/collection'}
      >
        <ListItemIcon>
          <Avatar sx={{ bgcolor: 'petimage.main' }}>
            <InsertPhotoOutlinedIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText sx={{height:'100%'}}>보관함</ListItemText>
      </LinkMenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          setAnchorEl(null)
          logout()
        }}
      >
        <ListItemIcon>
          <LogoutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="로그아웃" />
        {/* <Button
          // onClick={() => {
          //   setAnchorEl(null) // close menu
          //   signout()
          // }}
          sx={{ color: 'text.secondary' }}
          variant="text"
        >
          회원탈퇴
        </Button> */}
      </MenuItem>
    </Menu>
  )
}

