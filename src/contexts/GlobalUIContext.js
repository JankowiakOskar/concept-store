import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  showSidePanel as showSidePanelAction,
  hideSidePanel as hideSidePanelAction,
} from 'actions/ui';
import { uiReducer, initialState } from 'reducers/uiReducer';

export const UIContext = React.createContext();

const GlobalUIProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialState);
  const panelTypes = {
    menu: 'Menu',
    cart: 'Shopping Cart',
    filter: 'Filter',
  };
  const setOpenSidePanel = (panelType) =>
    showSidePanelAction(dispatch, panelType);

  const hideSidePanel = () => hideSidePanelAction(dispatch);

  const sidePanel = {
    isOpen: uiState.sidePanel.isOpen,
    choosenPanel: uiState.sidePanel.choosenPanel,
    setOpenSidePanel,
    hideSidePanel,
    panelTypes,
  };

  return <UIContext.Provider value={sidePanel}>{children}</UIContext.Provider>;
};

GlobalUIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalUIProvider;
