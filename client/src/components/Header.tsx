import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"
import Logo from "../assets/logo.svg?react"

import { useState } from "react";
import { isMobile } from "react-device-detect";
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileNav from "./MobileNav";
import WebNav from "./WebNav";
import LoginModal from "./LoginModal";
import useAuth from "../util/useAuth";



export default function Header() {
  const pathname = useLocation().pathname
  const hasGifBG = pathname === '/' || pathname === '/create'

  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const { setLoginModal, loginModalOpen } = useAuth()

  return (
    <HeaderContainer hasGifBG={hasGifBG} loginModalOpen={loginModalOpen}>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      {loginModalOpen && <LoginModal />}
      {isMobile ? <>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(drawerOpen && { display: 'none' }) }}
        >
          <MenuRoundedIcon sx={{ fontSize: '48px' }} />
        </IconButton>
        <MobileNav drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} />
      </>
        : <WebNav />
      }
    </HeaderContainer>
  )
}

type HeaderContainerProps = {
  hasGifBG: boolean
  loginModalOpen: boolean
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${isMobile ? '92px' : 'var(--nav-h)'};
  padding: 0 var(--pd-nav);
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EAEDEF;
  padding-right: ${props => props.loginModalOpen ? 'calc(var(--pd-nav) + 14px)' :'var(--pd-nav)'};
  position: fixed;
  top:0;
  z-index: 100;
  background-color: ${props => props.hasGifBG ? 'transparent' : 'white'};
  color: ${props => props.hasGifBG ? 'white' : 'var(--primary)'};
  .logo {
    width: auto;
    height: 100%;
    max-height: 60px;
    svg {
      color: var(--petimage);
      height: 100%;
      width: auto;
    }
  }

  `

