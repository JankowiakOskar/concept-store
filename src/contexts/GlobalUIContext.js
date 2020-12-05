import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { showSidePanel, hideSidePanel } from 'actions/ui';
import { uiReducer, initialState } from 'reducers/uiReducer';

export const UIContext = React.createContext();

const GlobalUIProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialState);
  const panelTypes = ['menu', 'shoppingCart'];
  const setOpenSidePanel = (panelType) => showSidePanel(dispatch, panelType);

  const closeSidePanel = () => hideSidePanel(dispatch);

  const sidePanel = {
    isOpen: uiState.sidePanel.isOpen,
    panelType: uiState.sidePanel.panelType,
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
