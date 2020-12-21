import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  REMOVE_ALL_PRODUCTS,
} from 'actions/data';

export const initialState = {
  categoriesOptions: [],
  filteredItems: [],
  numFetchingItems: 0,
  isFiltering: false,
  error: {},
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        isFiltering: !state.isFetching,
        numFetchingItems: action.payload.numItemsRequest,
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFiltering: !state.isFiltering,
        categoriesOptions: [
          ...state.categoriesOptions,
          ...action.payload.allCategories,
        ],
        filteredItems: action.payload.categoriesItems
          ? action.payload.categoriesItems
          : [],
        numFetchingItems: 0,
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        isFiltering: !state.isFiltering,
        error: action.payload.error,
        numFetchingItems: 0,
      };
    case REMOVE_ALL_PRODUCTS:
      return {
        ...state,
        filteredItems: [],
      };
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
};
