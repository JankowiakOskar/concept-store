import React from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as Logo } from 'assets/svgs/Logo.svg'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import NotesIcon from '@material-ui/icons/Notes'

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.grey200};
`

const Nav = styled.nav`
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledLogo = styled(Logo)`
  width: 170px;
`

const baseIconStyle = css`
  font-size: 3rem !important;
  color: ${({ theme }) => theme.black};
`

const FavoriteIcon = styled(FavoriteBorderIcon)`
  ${baseIconStyle}
`

const BasketIcon = styled(ShoppingBasketIcon)`
  ${baseIconStyle}
`

const HamburgerIcon = styled(NotesIcon)`
  ${baseIconStyle}
`

const NavBar = () => {
  return (
    <Wrapper>
      <Nav>
        <StyledLogo />
        <FavoriteIcon />
        <BasketIcon />
        <HamburgerIcon />
      </Nav>
    </Wrapper>
  )
}

export default NavBar
