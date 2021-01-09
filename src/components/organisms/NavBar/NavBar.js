import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { UIContext } from 'contexts/GlobalUIContext';
import styled from 'styled-components';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';
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
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.mobileSidesPadding};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => theme.mq.bigTablet} {
    padding: 0px 40px 0;
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 0px 100px 0;
  }
`;

const MenuList = styled.ul`
  display: none;
  ${({ theme }) => theme.mq.bigTablet} {
    flex: 3 1 0%;
    display: block;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${({ theme }) => theme.white};
  }
`;

const MenuElement = styled.li`
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

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme, isOverScrolled }) =>
    isOverScrolled ? theme.black : theme.white};

  transition: all 0.15s ease-in-out;
`;

const ElementWrapper = styled.div`
  position: relative;
  display: flex;
  ${({ theme }) => theme.mq.tablet} {
    margin: 0 20px;
  }
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
  ${baseIconStyle};
`;

const HamburgerIcon = styled(NotesIcon)`
  ${baseIconStyle}

  ${({ theme }) => theme.mq.bigTablet} {
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
  const [scrollYPos] = useScrollPos(window);
  const [numWishedProducts] = useNumStoredItems('wishlist');
  const [numProductsInBasket] = useNumStoredItems('shoppingCart');
  return (
    <Wrapper isOverScrolled={scrollYPos > 100}>
      <Nav>
        <MenuList>
          <MenuElement>
            <StyledLink isOverScrolled={scrollYPos > 100} to={routes.home}>
              Home
            </StyledLink>
          </MenuElement>
          <MenuElement>
            <StyledLink isOverScrolled={scrollYPos > 100} to={routes.clothes}>
              Clothes
            </StyledLink>
          </MenuElement>
        </MenuList>
        <LogoWrapper>
          <StyledLink to={routes.home}>
            <StyledLogo />
          </StyledLink>
        </LogoWrapper>
        <NavList>
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
        </NavList>
      </Nav>
    </Wrapper>
  );
};

export default NavBar;
