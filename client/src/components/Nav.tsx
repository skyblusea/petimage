import styled from "@emotion/styled"
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import { Link } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "../assets/logo.svg?react"
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)


  return (
    <HeaderContainer>
      <NavWrraper>
        <Link to="/" className="logo">
          <SvgIcon component={Logo}
            color="primary"
            inheritViewBox
            sx={{
              height: '100%',
              width: 'auto',
            }}
          />
        </Link>
        <Nav>
          <Link to="/service">Service</Link>
          <Link to="/about">About</Link>
          <Link to="/product">Product</Link>
        </Nav>
        <Button
          sx={{
            flexShrink: 0,
            borderColor: 'var(--primary)',
          }}
          onClick={() => setIsLoginModalOpen(!isLoginModalOpen)}
          variant="outlined" color="primary" startIcon={<AccountCircleOutlinedIcon />}>
          {isLogin ? '내 정보' : '로그인'}
        </Button>
        <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      </NavWrraper>
    </HeaderContainer>
  )
}


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--nav-h);
  padding: var(--pd-nav-lg);
  border-bottom: 1px solid var(--primary);
  position: fixed;
  top:0;
  z-index: 100;
  background-color: white;
  color: var(--primary);
   & .logo{
    display: inline-flex;
    align-items: center;
   }
  @media screen and (max-width: 1200px){
    padding: var(--pd-nav-md);
  }
  @media screen and (max-width: 900px){
    padding: var(--pd-nav-sm);
    font-size: var(--font-md);
  }
  `

const Nav = styled.nav`
  font-size: var(--font-lg);
  display: flex;
  gap: 1.5rem;
  width: 100%;
  align-items: end;
  padding: 0 var(--gap-lg);
  line-height: 1;
`

const NavWrraper = styled.div`
  display: flex;
  width: 100%;
`