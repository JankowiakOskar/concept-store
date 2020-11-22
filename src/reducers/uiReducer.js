import { SHOW_SIDEPANEL, HIDE_SIDEPANEL } from 'actions/ui'

export const initialState = {
  sidePanel: {
    isOpen: false,
    panelType: '',
  },
  modal: {
    isOpen: false,
    type: '',
  },
}

export const uiReducer = (state, action) => {
  switch (action.type) {
    case SHOW_SIDEPANEL:
      return {
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          panelType: action.payload,
        },
      }
    case HIDE_SIDEPANEL:
      return {
        sidePanel: {
          isOpen: !state.sidePanel.isOpen,
          panelType: '',
        },
      }
    default:
      throw new Error(`Unhandled action: ${action.type}`)
  }
}
