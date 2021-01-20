import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  SET_SELECTED_FILTERS,
  SET_PRICE_FILTERS,
  SET_SORT_METHOD,
  SET_SEARCH_VALUE,
  REMOVE_ALL_FILTERS,
} from 'actions/filterActions';

export const initialState = {
  categoriesOptions: [],
  categoryFilters: [],
  priceFilters: { min: 0, max: 200 },
  searchValue: '',
  sortMethod: {},
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
        categoryFilters: action.payload.filters,
      };
    case SET_PRICE_FILTERS:
      return {
        ...state,
        priceFilters: action.payload.filters,
      };
    case SET_SORT_METHOD:
      return {
        ...state,
        sortMethod: action.payload.sortMethod,
      };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: action.payload.searchValue,
      };
    case REMOVE_ALL_FILTERS:
      return {
        ...state,
        categoryFilters: [],
        priceFilters: { min: 0, max: 200 },
        sortMethod: {},
        searchValue: '',
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};
