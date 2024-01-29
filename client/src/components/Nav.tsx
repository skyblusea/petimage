import styled from "@emotion/styled"
import { Link, useLocation } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "../assets/logo.svg?react"
import { LinkButton } from "./LinkComponents";
import useAuth from "../util/useAuth";
import Button from '@mui/material/Button';
import { useState } from "react";
import MenuModal from "./MenuModal";


export default function Header() {
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const pathname = useLocation().pathname
  const hasGifBG = pathname === '/' || pathname === '/create'

  return (
    <HeaderContainer hasGifBG={hasGifBG}>
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <Nav hasGifBG={hasGifBG} >
        <Link to="/service">Service</Link>
        <Link to="/about">About</Link>
        <Link to="/product">Product</Link>
      </Nav>
      {user
        ? <Button
          id="user-menu-btn"
          sx={{
            flexShrink: 0,
          }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          endIcon={<AccountCircleOutlinedIcon />}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          variant="outlined"
          color={hasGifBG ?'secondary' :'primary'}
        >내 정보</Button>
        : <LinkButton
          component={Link}
          to="/auth"
          sx={{
            flexShrink: 0,
          }}
          variant="outlined"
          color={hasGifBG ?'secondary' :'primary'}
          endIcon={<AccountCircleOutlinedIcon />}>
          로그인
        </LinkButton>
      }
      {open && <MenuModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} />}
    </HeaderContainer>
  )
}

type HeaderContainerProps = {
  hasGifBG: boolean
}

const HeaderContainer = styled.header<HeaderContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--nav-h);
  padding: var(--pd-nav);
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #EAEDEF;;
  position: fixed;
  top:0;
  z-index: 100;
  background-color: ${props => props.hasGifBG ? 'transparent' : 'white'};
  color: var(--primary);
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

const Nav = styled.nav<HeaderContainerProps>`
  font-size: var(--font-lg);
  color: ${props => props.hasGifBG ? 'white' : 'inherit'};
  display: flex;
  gap: 1.5rem;
  width: 100%;
  height: 100%;
  align-items: end;
  padding: 0 var(--gap-lg);
  line-height: 1;
  mix-blend-mode: normal; // 투과 모드
  padding-bottom: 12px; //로고랑 높이 맞추기
  @media screen and (max-width: 900px){
    padding-bottom: 0px;
    }
`
