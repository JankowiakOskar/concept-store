import { SHOW_SIDEPANEL, HIDE_SIDEPANEL, TOGGLE_MODAL } from 'actions/ui';

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
        ...state,
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          choosenPanel: action.payload,
        },
      };
    case HIDE_SIDEPANEL:
      return {
        ...state,
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          choosenPanel: '',
        },
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        [action.payload.uiComponent]: {
          isOpen: !state[action.payload.uiComponent].isOpen,
          type: state[action.payload.uiComponent].isOpen
            ? ''
            : action.payload.modalType,
        },
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};
