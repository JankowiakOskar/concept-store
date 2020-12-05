export const SHOW_SIDEPANEL = 'SHOW_SIDEPANEL';
export const HIDE_SIDEPANEL = 'HIDE_SIDEPANEL';

export const showSidePanel = (dispatch, panelType) =>
  dispatch({ type: SHOW_SIDEPANEL, payload: panelType });

export const hideSidePanel = (dispatch) => dispatch({ type: HIDE_SIDEPANEL });
