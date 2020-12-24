import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  SET_SELECTED_FILTERS,
  REMOVE_ALL_FILTERS,
} from 'actions/filterActions';

export const initialState = {
  categoriesOptions: [],
  selectedFilters: {},
  isLoadingFilters: false,
  error: {},
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isLoadingFilters: !state.isLoadingFilters,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingFilters: !state.isLoadingFilters,
        categoriesOptions: [
          ...state.categoriesOptions,
          ...action.payload.categoriesWithAmountProducts,
        ],
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoadingFilters: !state.isFiltering,
        error: action.payload.error,
      };
    case SET_SELECTED_FILTERS:
      return {
        ...state,
        selectedFilters: action.payload.filters,
      };
    case REMOVE_ALL_FILTERS:
      return {
        ...state,
        selectedFilters: {},
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};
