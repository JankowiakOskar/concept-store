import React, { useContext, useEffect } from 'react';
import routes from 'routes';
import { UIContext } from 'contexts/GlobalUIContext';

import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIconComponent from 'components/atoms/CloseIconComponent/CloseIconComponent';
import ShopingCartTemplate from 'templates/ShoppingCartTemplate';
import MenuList from 'components/molecules/MenuList/MenuList';
import SearchForm from 'components/organisms/SearchForm/SearchForm';
import FilterForm from 'components/organisms/FilterForm/FilterForm';

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
  }

  ${({ theme }) => theme.mq.bigTablet} {
    width: 360px;
    left: calc(100% - 360px);
  }

  ${({ isMenuPanel }) =>
    isMenuPanel &&
    css`
      left: 0;
      box-shadow: 3px 0px 5px 0px rgba(0, 0, 0, 0.4);
    `}
`;

const TitlePanel = styled.h3`
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const PanelHeader = styled.div`
  display: flex;
  height: 80px;
  width: 100%;
  padding: 20px ${({ theme }) => theme.layout.mobileSidesPadding} 14px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.grey200};
`;

const panelVariants = {
  hidden: (isMenuPanel) => ({
    x: isMenuPanel ? -100 : 100,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'easeIn',
      duration: 0.3,
    },
  },
  exit: (isMenuPanel) => ({
    x: isMenuPanel ? -100 : 100,
    opacity: [1, 0.5, 0],
    transition: {
      type: 'easeOut',
      duration: 0.3,
    },
  }),
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

  useEffect(() => {
    if (isOpen) document.body.style = 'overflow: hidden';
    else {
      document.body.style = 'overflow: auto';
    }
  }, [isOpen]);

  const isMenuPanel = choosenPanel === menu;

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <Wrapper
          variants={panelVariants}
          custom={isMenuPanel}
          initial="hidden"
          animate="visible"
          exit="exit"
          isMenuPanel={isMenuPanel}
        >
          <PanelHeader>
            <TitlePanel>{choosenPanel}</TitlePanel>
            <CloseIconComponent handleClose={hideSidePanel} isActiveAnimation />
          </PanelHeader>
          {choosenPanel === menu && (
            <>
              <SearchForm />
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
            </>
          )}
          {choosenPanel === cart && <ShopingCartTemplate />}
          {choosenPanel === filter && (
            <FilterForm handleClosePanel={hideSidePanel} />
          )}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
