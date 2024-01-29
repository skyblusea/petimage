import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation } from 'react-router-dom';
import { LinkListItemButton } from './LinkComponents';
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
      onClose={() => setAnchorEl(null)}
      open={!!anchorEl}
      MenuListProps={{
        'aria-labelledby': 'user-menu-btn',
      }}
      sx={{
        '& .MuiPaper-root' : {
          marginTop : 'var(--gap-sm)'
        },
        '.css-6hp17o-MuiList-root-MuiMenu-list':{
          paddingBottom: 0,
        }
      }}
    >
      <LinkListItemButton
        to="/payment/history"
        LinkComponent={Link}
        selected={pathname === '/payment/history'}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'petimage.main' }}>
            <ReceiptOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>결제 내역</ListItemText>
      </LinkListItemButton>
      <LinkListItemButton
        to="/collection"
        LinkComponent={Link}
        selected={pathname === '/collection'}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'petimage.main' }}>
            <InsertPhotoOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>보관함</ListItemText>
      </LinkListItemButton>
      <Divider />
      <ListItem >
        <Button
          onClick={()=>{
            setAnchorEl(null)
            logout()
          }}
          color="error"
          startIcon={<LogoutIcon />}
        >
          로그아웃
        </Button>
        {/* <Button
            sx={{ color : 'error.main'}}
            startIcon={<LogoutIcon color="error"/>}
          >
            로그아웃
          </Button> */}
        <Button
          sx={{ color: 'text.secondary' }}
          variant="text"
        >
          회원탈퇴
        </Button>
      </ListItem>
    </Menu>
  )
}

