import React, { useContext, useEffect } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIconComponent from 'components/atoms/CloseIconComponent/CloseIconComponent';
import ShopingCartTemplate from 'templates/ShoppingCartTemplate';
import MenuList from 'components/molecules/MenuList/MenuList';
import routes from 'routes';
import FilterForm from 'components/organisms/FilterForm/FilteForm';
import useSavedValues from 'hooks/useSavedValues';

const Wrapper = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndex.level10};
  background-color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mq.tablet} {
    top: 0;
    width: 300px;
    left: calc(100% - 300px);
    box-shadow: -3px 0px 5px 0px rgba(0, 0, 0, 0.4);

    ${({ isMenuPanel }) =>
      isMenuPanel &&
      css`
        left: 0;
        box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.4);
      `}
  }

  ${({ theme }) => theme.mq.bigTablet} {
    width: 360px;
    left: calc(100% - 360px);
  }
`;

const TitlePanel = styled.h3`
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const PanelHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 20px ${({ theme }) => theme.layout.mobileSidesPadding} 14px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.grey200};
`;

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

const otherVariants = {
  hidden: {
    x: '100%',
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
    sidePanel: {
      isOpen,
      choosenPanel,
      hideSidePanel,
      panelTypes: { menu, cart, filter },
    },
  } = useContext(UIContext);
  const {
    data: { shoppingCart },
  } = useContext(StoreContext);
  const [savedValues, saveValues] = useSavedValues();
  useEffect(() => {
    if (isOpen) document.body.style = 'overflow: hidden';
    else {
      document.body.style = 'overflow: auto';
    }
  }, [isOpen]);

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Wrapper
          variants={choosenPanel === menu ? menuPanelVariants : otherVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          isMenuPanel={choosenPanel === menu}
        >
          <PanelHeader>
            <TitlePanel>{choosenPanel}</TitlePanel>
            <CloseIconComponent handleClose={hideSidePanel} isActiveAnimation />
          </PanelHeader>
          {choosenPanel === menu && (
            <MenuList
              handleClosePanel={hideSidePanel}
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
          {choosenPanel === cart && (
            <ShopingCartTemplate shoppingCart={shoppingCart} />
          )}
          {choosenPanel === filter && (
            <FilterForm
              handleClosePanel={hideSidePanel}
              saveValues={saveValues}
              savedValues={savedValues}
            />
          )}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
