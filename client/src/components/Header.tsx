import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"
import Logo from "../assets/logo.svg?react"

import { useState } from "react";
import { isMobile } from "react-device-detect";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '../assets/menu.svg?react';
import MobileNav from "./MobileNav";
import WebNav from "./WebNav";
import LoginModal from "./LoginModal";
import useAuth from "../util/useAuth";
import { SvgIcon } from "@mui/material";


export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const { loginModalOpen } = useAuth()

  return (
    <HeaderContainer loginModalOpen={!!loginModalOpen}>
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
          <SvgIcon component={MenuIcon} inheritViewBox color="petimage" />
        </IconButton>
        <MobileNav drawerOpen={drawerOpen} handleDrawerClose={handleDrawerClose} />
      </>
        : <WebNav />
      }
    </HeaderContainer>
  )
}

type HeaderContainerProps = {
  loginModalOpen: boolean
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--nav-h);
  padding: 0 var(--pd-nav);
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EAEDEF;
  padding-right: ${props => props.loginModalOpen ? 'calc(var(--pd-nav) + 14px)' :'var(--pd-nav)'};
  position: fixed;
  top:0;
  z-index: 100;
  background-color: white;
  color: var(--primary) ;
  .logo {
    width: auto;
    height: 100%;
    svg {
      color: var(--petimage);
      height: 100%;
      width: auto;
    }
  }

  `

