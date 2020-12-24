import React, { useContext, useEffect } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import styled from 'styled-components';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@material-ui/icons/Close';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShopingCartTemplate from 'templates/ShoppingCartTemplate';
import MenuList from 'components/molecules/MenuList/MenuList';
import routes from 'routes';
import FilterForm from 'components/organisms/FilterForm/FilteForm';

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

const otherVariants = {
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
    choosenPanel,
    hideSidePanel,
    panelTypes: { menu, cart, filter },
  } = useContext(UIContext);
  const {
    data: { shoppingCart },
  } = useContext(StoreContext);

  const {
    state: { selectedFilters },
    setSelectedFilters,
  } = useContext(FilterContext);

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
        >
          <PanelHeader>
            <TitlePanel>{choosenPanel}</TitlePanel>
            <CloseIconWrapper onClick={() => hideSidePanel()}>
              <StyledCloseIcon />
            </CloseIconWrapper>
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
              saveValues={setSelectedFilters}
              savedValues={selectedFilters}
            />
          )}
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default SidePanel;
