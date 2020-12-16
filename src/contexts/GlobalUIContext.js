import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { showSidePanel, hideSidePanel } from 'actions/ui';
import { uiReducer, initialState } from 'reducers/uiReducer';

export const UIContext = React.createContext();

const GlobalUIProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialState);
  const panelTypes = {
    menu: 'Menu',
    cart: 'Shopping Cart',
    filter: 'Filter',
  };
  const setOpenSidePanel = (panelType) => showSidePanel(dispatch, panelType);

  const closeSidePanel = () => hideSidePanel(dispatch);

  // const createTitleDisplayedPanel = (displayedPanel) => {
  //   const makeCapitalWord = (word) => {
  //     const capitalWord =
  //       word.chartAt(0).toUppercase() + displayedPanel.slice(1);
  //     return capitalWord;
  //   };
  //   switch (displayedPanel) {
  //     case 'menu':
  //       return makeCapitalWord(displayedPanel);
  //     case 'cart':
  //       return `Shopping ${makeCapitalWord(displayedPanel)}`;
  //     case 'filter':
  //       return makeCapitalWord(displayedPanel);
  //     default:
  //       return '';
  //   }
  // };

  const sidePanel = {
    isOpen: uiState.sidePanel.isOpen,
    choosenPanel: uiState.sidePanel.choosenPanel,
    setOpenSidePanel,
    closeSidePanel,
    panelTypes,
  };

  return <UIContext.Provider value={sidePanel}>{children}</UIContext.Provider>;
};

GlobalUIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalUIProvider;
