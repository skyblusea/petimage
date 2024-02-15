import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import styled from "@emotion/styled"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import useAuth from '../util/useAuth';
import { LinkListItemButton } from './LinkComponents';
import ReceiptIcom from '../assets/receipt.svg?react';
import AlbumIcon from '../assets/album.svg?react';
import Arrow from '../assets/arrow.svg?react';
import { Link } from 'react-router-dom';




export default function MobileNav({
  drawerOpen,
  handleDrawerClose,
}: {
  drawerOpen: boolean;
  handleDrawerClose: () => void;
}) {
  const { user, logout, setLoginModal } = useAuth()

  return (
    <Drawer
      sx={{ '& .MuiDrawer-paper': { width: '70vw' } }}
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <SvgIcon inheritViewBox component={Arrow} fontSize='large' />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['결제 내역', '보관함'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <LinkListItemButton
              component={Link}
              to={index === 0 ? '/payment/history' : '/collection'}
              onClick={handleDrawerClose}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {index === 0 
                ? <SvgIcon inheritViewBox component={ReceiptIcom} />
                : <SvgIcon inheritViewBox component={AlbumIcon} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </LinkListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Service', 'About', 'Product'].map((text) => (
          <ListItem key={text} disablePadding>
            <LinkListItemButton
              component={Link}
              to={`/${text.toLowerCase()}`}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={text} />
            </LinkListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {user
        ?
        <ListItem>
          <Button
            sx={{ color: 'text.secondary', ml: '-8px' }}
            onClick={() => {
              handleDrawerClose()
              logout()
            }}
          >
            로그아웃
          </Button>
        </ListItem>
        :
        <ListItem>
          <Button
            sx={{ color: 'text.secondary', ml: '-8px' }}
            onClick={() => {
              handleDrawerClose()
              setLoginModal(true)
            }}
          >
            로그인
          </Button>
        </ListItem>
      }
    </Drawer>
  )
}
const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
