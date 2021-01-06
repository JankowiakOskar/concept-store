import axios from 'axios';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CAREGORIES_FAILURE';

export const SET_SELECTED_FILTERS = 'SET_SELECTED_FILTERS';
export const SET_PRICE_FILTERS = 'SET_PRICE_FILTERS';
export const SET_SORT_METHOD = 'SET_SORT_METHOD';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

export const getCategories = async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });

  try {
    const { data } = await axios.get(`http://192.168.100.17:8001/categories`);

    const categoriesWithAmountProducts = data.reduce((acc, category) => {
      const categoryName = category.name;
      const [{ products: allCategoryProducts }] = category[categoryName];
      const productsNum = allCategoryProducts.length;
      acc.push({ categoryName, productsNum });
      return acc;
    }, []);

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: { categoriesWithAmountProducts },
    });
  } catch (err) {
    dispatch({ type: GET_CATEGORIES_FAILURE, payload: err });
  }
};

export const setSelectedFilters = (dispatch, filters) =>
  dispatch({ type: SET_SELECTED_FILTERS, payload: { filters } });

export const setPriceFilters = (dispatch, filters) => {
  dispatch({ type: SET_PRICE_FILTERS, payload: { filters } });
};

export const setSortMethod = (dispatch, sortMethod) => {
  dispatch({ type: SET_SORT_METHOD, payload: { sortMethod } });
};

export const removeAllFilters = (dispatch) =>
  dispatch({ type: REMOVE_ALL_FILTERS });
