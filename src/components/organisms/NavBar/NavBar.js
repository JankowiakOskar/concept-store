import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { UIContext } from 'contexts/GlobalUIContext';
import styled from 'styled-components';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
import { ReactComponent as Logo } from 'assets/svgs/Logo.svg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import NotesIcon from '@material-ui/icons/Notes';
import useScrollPos from 'hooks/useScrollPos';
import useNumStoredItems from 'hooks/useNumStoredItems';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.75);
  z-index: ${({ theme }) => theme.zIndex.level9};
  background-color: ${({ isOverScrolled, theme }) =>
    isOverScrolled ? theme.white : 'transparent'};
  transition: background-color 0.2s 0.1s ease;
`;

const Nav = styled.nav`
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const ElementWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Circle = styled.span`
  position: absolute;
  top: -5px;
  right: -8px;
  width: 16px;
  height: 16px;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  font-size: ${({ theme }) => theme.font.size.small};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryDark};
`;

const StyledLogo = styled(Logo)`
  width: 170px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  ${baseIconStyle}
`;

const BasketIcon = styled(ShoppingBasketIcon)`
  ${baseIconStyle}
`;

const HamburgerIcon = styled(NotesIcon)`
  ${baseIconStyle}
`;

const NavBar = () => {
  const {
    setOpenSidePanel,
    panelTypes: { menu, cart },
  } = useContext(UIContext);
  const [scrollYPos] = useScrollPos(window);
  const [numWishedProducts] = useNumStoredItems('wishlist');
  const [numProductsInBasket] = useNumStoredItems('shoppingCart');
  return (
    <Wrapper isOverScrolled={scrollYPos > 100}>
      <Nav>
        <StyledLink to={routes.home}>
          <StyledLogo />
        </StyledLink>
        <StyledLink to={routes.wishlist}>
          <ElementWrapper>
            <StyledFavoriteIcon />
            {numWishedProducts > 0 && <Circle>{numWishedProducts}</Circle>}
          </ElementWrapper>
        </StyledLink>
        <ElementWrapper onClick={() => setOpenSidePanel(cart)}>
          <BasketIcon />
          {numProductsInBasket > 0 && <Circle>{numProductsInBasket}</Circle>}
        </ElementWrapper>
        <HamburgerIcon onClick={() => setOpenSidePanel(menu)} />
      </Nav>
    </Wrapper>
  );
};

export default NavBar;
