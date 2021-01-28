import React, { useContext } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import routes from 'routes';
import { UIContext } from 'contexts/GlobalUIContext';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import {
  baseIconStyle,
  hoverIconStyle,
} from 'components/atoms/ExternalIcon/ExternalIcon';
import { ReactComponent as Logo } from 'assets/svgs/Logo.svg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import NotesIcon from '@material-ui/icons/Notes';
import useScrollPos from 'hooks/useScrollPos';
import useNumStoredItems from 'hooks/useNumStoredItems';
import SearchForm from 'components/organisms/SearchForm/SearchForm';
import useWindowWidth from 'hooks/useWindowWidth';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${({ theme }) => theme.grey400};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.75);
  z-index: ${({ theme }) => theme.zIndex.level9};
  background-color: ${({ theme }) => theme.white};
  transition: all 0.2s 0.1s ease-in-out;

  ${({ $isHomePage, $scrolled, theme }) =>
    $isHomePage &&
    css`
      background-color: ${$scrolled ? theme.white : 'transparent'};
    `}
`;

const Nav = styled.nav`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.mq.tablet} {
    padding: 0px 20px 0;
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 0px 40px 0;
  }
`;

const MenuList = styled.ul`
  display: none;
  ${({ theme }) => theme.mq.bigTablet} {
    height: 100%;
    flex: 3 1 0%;
    display: block;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const MenuElement = styled.li`
  height: 100%;
  width: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavList = styled.ul`
  flex: 0.8 1 0%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.mq.tablet} {
    justify-content: flex-end;
    flex: 3 1 0%;
  }
`;

const LogoWrapper = styled.div`
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const activeClassName = 'nav-item--active';

const StyledLink = styled(NavLink).attrs({ activeClassName })`
  text-decoration: none;
  height: 100%;
  color: ${({ theme }) => theme.black};
  transition: all 0.15s ease-out;

  ${({ $isHomePage, $scrolled, theme }) =>
    $isHomePage &&
    css`
      color: ${$scrolled ? theme.black : theme.white};
    `}

  &.${activeClassName} {
    color: ${({ theme }) => theme.primary};
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ElementWrapper = styled.div`
  position: relative;
  display: flex;
  padding: 5px;
  ${({ theme }) => theme.mq.tablet} {
    margin: 0 20px;
  }

  ${hoverIconStyle}
`;

const Circle = styled(motion.span)`
  position: absolute;
  top: -3px;
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
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.75);
`;

const StyledLogo = styled(Logo)`
  width: 170px;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  ${baseIconStyle}
`;

const BasketIcon = styled(ShoppingBasketIcon)`
  ${baseIconStyle};
`;

const HamburgerIcon = styled(NotesIcon)`
  ${baseIconStyle}

  ${({ theme }) => theme.mq.desktop} {
    display: none !important;
  }
`;

const NavBar = () => {
  const {
    sidePanel: {
      setOpenSidePanel,
      panelTypes: { menu, cart },
    },
  } = useContext(UIContext);
  const overDesktopMedia = '(min-width: 1150px)';

  const { pathname } = useLocation();

  const [scrollYPos] = useScrollPos(window);
  const [numWishedProducts] = useNumStoredItems('wishlist');
  const [numProductsInBasket] = useNumStoredItems('shoppingCart');

  const [isMatchedWidth] = useWindowWidth(overDesktopMedia);

  const isHomePage = pathname === routes.home;
  const scrollOver100 = scrollYPos > 100;

  return (
    <Wrapper $isHomePage={isHomePage} $scrolled={scrollOver100}>
      <Nav>
        <MenuList>
          <StyledLink
            $isHomePage={isHomePage}
            $scrolled={scrollYPos > 100}
            exact
            to={routes.home}
          >
            <MenuElement>Home</MenuElement>
          </StyledLink>
          <StyledLink
            $isHomePage={isHomePage}
            $scrolled={scrollYPos > 100}
            to={routes.clothes}
          >
            <MenuElement>Clothes</MenuElement>
          </StyledLink>
        </MenuList>
        <LogoWrapper>
          <Link exact to={routes.home}>
            <StyledLogo />
          </Link>
        </LogoWrapper>
        <NavList>
          {isMatchedWidth && <SearchForm onNavBar />}

          <Link to={routes.wishlist}>
            <ElementWrapper>
              <StyledFavoriteIcon />
              {numWishedProducts > 0 && <Circle>{numWishedProducts}</Circle>}
            </ElementWrapper>
          </Link>
          <ElementWrapper onClick={() => setOpenSidePanel(cart)}>
            <BasketIcon />
            {numProductsInBasket > 0 && <Circle>{numProductsInBasket}</Circle>}
          </ElementWrapper>
          <HamburgerIcon onClick={() => setOpenSidePanel(menu)} />
        </NavList>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;
