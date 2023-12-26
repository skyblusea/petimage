import styled from "@emotion/styled"
import { Button, SvgIcon } from "@mui/material"
import { Link } from "react-router-dom"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Logo from "../assets/logo.svg?react"

export default function Header() {
  return (
    <HeaderContainer>
      <NavWrraper>
        <Link to="/" className="logo">
          <SvgIcon component={Logo} inheritViewBox
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
            borderRadius: '100px',
            borderColor: 'var(--white)',

          }}
          variant="outlined" color="primary" startIcon={<AccountCircleOutlinedIcon />}>
          내 정보
        </Button>
      </NavWrraper>
    </HeaderContainer>
  )
}


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 92px;
  padding: var(--pd-lg);
  border-bottom: 1px solid var(--white);
  position: fixed;
  z-index: 1;
  color: var(--white);
   & .logo{
    display: inline-flex;
    align-items: center;
   }
  @media screen and (max-width: 1200px){
    padding: var(--pd-md);
  }
  @media screen and (max-width: 900px){
    height: 60px;
    padding: var(--pd-sm);
    font-size: var(--font-md);
  }
  `

const Nav = styled.nav`
  font-size: var(--font-lg);
  display: flex;
  gap: var(--gap-sm);
  width: 100%;
  align-items: end;
  padding: 0 var(--gap-lg);
  line-height: 1;
`

const NavWrraper = styled.div`
  display: flex;
  width: 100%;
`