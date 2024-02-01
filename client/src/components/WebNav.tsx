import MenuModal from "./MenuModal";
import { LinkButton, LinkListItemButton } from "./LinkComponents";
import useAuth from "../util/useAuth";
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import styled from "@emotion/styled"
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import Auth from "./LoginModal";


export default function WebNav() {
  const { user, setLoginModal } = useAuth()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const pathname = useLocation().pathname
  const hasGifBG = pathname === '/' || pathname === '/create'


  return (
    <>
      <Nav >
        <Link to="/service">Service</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
      </Nav>
      {
        user
          ? <Button
            id="user-menu-btn"
            sx={{
              flexShrink: 0,
            }}
            onClick={handleClick}
            endIcon={<AccountCircleOutlinedIcon />}
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            color={hasGifBG ? 'secondary' : 'primary'}
          >내 정보</Button>
          : <Button
            onClick={() => setLoginModal(true)}
            sx={{ flexShrink: 0 }}
            variant="outlined"
            color={hasGifBG ? 'secondary' : 'primary'}
            endIcon={<AccountCircleOutlinedIcon />}>
            로그인
          </Button>
      }
      {open && <MenuModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
    </>
  )
}


const Nav = styled.nav`
  font-size: var(--font-lg);
  color: 'inherit';
  display: flex;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  align-items: end;
  padding: 0 var(--gap-lg);
  line-height: 1;
  mix-blend-mode: normal; // 투과 모드
  padding-bottom: 5px; //로고랑 높이 맞추기
  @media screen and (max-width: 900px){
    padding-bottom: 0px;
    }
`
