import { SHOW_SIDEPANEL, HIDE_SIDEPANEL } from 'actions/ui';

export const initialState = {
  sidePanel: {
    isOpen: false,
    choosenPanel: '',
  },
  modal: {
    isOpen: false,
    type: '',
  },
};

export const uiReducer = (state, action) => {
  switch (action.type) {
    case SHOW_SIDEPANEL:
      return {
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          choosenPanel: action.payload,
        },
      };
    case HIDE_SIDEPANEL:
      return {
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          choosenPanel: '',
        },
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};
