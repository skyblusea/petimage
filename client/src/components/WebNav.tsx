import MenuModal from "./MenuModal";
import useAuth from "../util/useAuth";
import Button from '@mui/material/Button';
import styled from "@emotion/styled"
import { useState } from "react";
import { Link } from "react-router-dom"
import UserIcon from '../assets/user.svg?react'

export default function WebNav() {
  const { user, setLoginModal } = useAuth()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);


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
            sx={{ flexShrink: 0 }}
            onClick={handleClick}
            endIcon={<UserIcon />}
            aria-controls={open ? 'user-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="outlined"
            color='primary'
          >내 정보</Button>
          : <Button
            onClick={() => setLoginModal(true)}
            sx={{ flexShrink: 0 }}
            variant="outlined"
            color='primary'
            endIcon={<UserIcon />}>
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
