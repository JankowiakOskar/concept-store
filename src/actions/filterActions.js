import axios from 'axios';

export const GET_CATEGORIES_REQUEST = 'GET_CATEGORIES_REQUEST';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CAREGORIES_FAILURE';

export const SET_SELECTED_FILTERS = 'SET_SELECTED_FILTERS';
export const REMOVE_ALL_FILTERS = 'REMOVE_ALL_FILTERS';

export const getCategories = async (dispatch) => {
  dispatch({ type: GET_CATEGORIES_REQUEST });

  try {
    const { data } = await axios.get(`http://192.168.100.17:1337/categories`);

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

export const removeAllFilters = (dispatch) =>
  dispatch({ type: REMOVE_ALL_FILTERS });
