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
import { LinkListItemButton, LinkMenuItem } from './LinkComponents';
import Menu from '@mui/material/Menu';
import { MenuItem } from '@mui/material';

export default function MenuModal({
  anchorEl,
  setAnchorEl
}: {
  anchorEl: HTMLElement | null
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}) {
  const pathname = useLocation().pathname

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
    >
      <LinkListItemButton
        to="/payments"
        LinkComponent={Link}
        selected={pathname === '/payments'}
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

