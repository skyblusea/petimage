import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import styled from "@emotion/styled"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import useAuth from '../util/useAuth';
import { LinkButton, LinkListItemButton } from './LinkComponents';
import { Link, useNavigate } from 'react-router-dom';


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
          <ChevronRightIcon sx={{ fontSize: '48px' }} />
        </IconButton>
      </DrawerHeader>
      <ListItem>
        <Button
          size="large"
          variant="outlined"
          onClick={() => {
            handleDrawerClose()
            setLoginModal(true)
          }}
          sx={{ borderRadius: '10px', width: '100%', textAlign: 'center' }}
        >로그인</Button>
      </ListItem>

      <Divider />
      <List>
        {['결제 내역', '보관함'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <LinkListItemButton
              to={index === 0 ? '/payment/history' : '/collection'}
              onClick={handleDrawerClose}
            >
              <ListItemIcon sx={{ minWidth: '40px' }}>
                {index === 0 ? <ReceiptOutlinedIcon /> : <InboxIcon />}
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
              to={`/${text.toLowerCase()}`}
              onClick={handleDrawerClose}
            >
              <ListItemText primary={text} />
            </LinkListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {user && (
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
      )}
    </Drawer>
  )
}
const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`
