import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  showSidePanel as showSidePanelAction,
  hideSidePanel as hideSidePanelAction,
  toggleModal as toggleModalAction,
} from 'actions/ui';
import { uiReducer, initialState } from 'reducers/uiReducer';

export const UIContext = React.createContext();

const GlobalUIProvider = ({ children }) => {
  const [uiState, dispatch] = useReducer(uiReducer, initialState);

  const panelTypes = {
    menu: 'Menu',
    cart: 'Shopping cart',
    filter: 'Filter',
  };

  const modalTypes = {
    cartSummary: 'Summary',
    addNewProduct: 'Add new product',
  };

  const setOpenSidePanel = (panelType) =>
    showSidePanelAction(dispatch, panelType);

  const hideSidePanel = () => hideSidePanelAction(dispatch);

  const toggleModal = (modalType) => toggleModalAction(dispatch, modalType);

  const sidePanel = {
    isOpen: uiState.sidePanel.isOpen,
    choosenPanel: uiState.sidePanel.choosenPanel,
    setOpenSidePanel,
    hideSidePanel,
    panelTypes,
  };

  const modal = {
    choosenType: uiState.modal.type,
    isOpen: uiState.modal.isOpen,
    toggleModal,
    modalTypes,
  };

  const globalUIValues = {
    sidePanel,
    modal,
  };

  return (
    <UIContext.Provider value={globalUIValues}>{children}</UIContext.Provider>
  );
};

GlobalUIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalUIProvider;
