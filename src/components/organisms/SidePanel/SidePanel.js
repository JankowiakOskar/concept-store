import React, { useContext } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShopingCartTemplate from 'templates/ShoppingCartTemplate';
import MenuList from 'components/molecules/MenuList/MenuList';
import routes from 'routes';

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndex.level10};
  background-color: ${({ theme }) => theme.white};
`;

const TitlePanel = styled.h3`
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const PanelHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 20px ${({ theme }) => theme.layout.mobileSidesPadding};
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.grey200};
`;
const CloseIconWrapper = styled(motion.span)`
  ${baseIconStyle};
`;
const StyledCloseIcon = styled(CloseIcon)``;

const menuPanelVariants = {
  hidden: {
    x: '-50%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 0.3,
    },
  },
  exit: {
    x: '-100%',
    opacity: 0,
  },
};

const shopingBasketVariants = {
  hidden: {
    x: '50%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: menuPanelVariants.visible.transition,
  },
  exit: {
    x: '100%',
    opacity: 0,
  },
};

const SidePanel = () => {
  const {
    isOpen,
    panelType,
    closeSidePanel,
    panelTypes: [menu, shopingCart],
  } = useContext(UIContext);

  const {
    data: { shoppingCart },
  } = useContext(StoreContext);
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Wrapper
          variants={
            panelType === menu ? menuPanelVariants : shopingBasketVariants
          }
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <PanelHeader>
            <TitlePanel>
              {panelType === 'menu' ? 'Menu' : 'Shopping Cart'}
            </TitlePanel>
            <CloseIconWrapper onClick={() => closeSidePanel()}>
              <StyledCloseIcon />
            </CloseIconWrapper>
          </PanelHeader>
          {panelType === 'menu' && (
            <MenuList
              handleClosePanel={closeSidePanel}
              list={[
                { name: 'Home', link: `${routes.home}`, icon: HomeIcon },
                {
                  name: 'Wishlist',
                  link: `${routes.wishlist}`,
                  icon: FavoriteIcon,
                },
                { name: 'Clothes', link: `${routes.clothes}` },
              ]}
            />
          )}
          {panelType === shopingCart && (
            <ShopingCartTemplate shoppingCart={shoppingCart} />
          )}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
