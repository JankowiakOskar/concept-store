import axios from 'axios';
import {
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  sleeper,
} from 'helpers';

import { limitQueryParam, allDataQueryParam } from 'helpers/queryHelpers';

export const FETCHING_PRODUCTS_REQUEST = 'FETCHING_PRODUCTS_REQUEST';
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS';
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE';

export const FETCHING_PRODUCT_REQUEST = 'FETCHING_PRODUCT_REQUEST';
export const FETCHING_PRODUCT_SUCCESS = 'FETCHING_PRODUCT_SUCCESS';
export const FETCHING_PRODUCT_FAILURE = 'FETCHING_PRODUCT_FAILURE';

export const GET_WISHLIST = 'GET_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'ADD_TO_WHISHLIST';

export const GET_SHOPPING_CART = 'GET_SHOPPING_CART';
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART';
export const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART';

export const REMOVE_MATCHED_PRODUCT = 'REMOVE_MATCHED_PRODUCT';

export const limitRequest = 12;

export const getProducts = async (dispatch, currentProducts) => {
  dispatch({ type: FETCHING_PRODUCTS_REQUEST });

  const limitQuery = limitQueryParam(currentProducts, limitRequest);

  try {
    const { data: products } = await axios.get(
      `http://localhost:1337/products?${limitQuery}`
    );

    await sleeper(500);

    const isAllProductsFetched = limitQuery.includes(allDataQueryParam);

    dispatch({
      type: FETCHING_PRODUCTS_SUCCESS,
      payload: { products, isAllProductsFetched },
    });
  } catch (error) {
    dispatch({
      type: FETCHING_PRODUCTS_FAILURE,
      payload: error,
    });
  }
};

export const getExactProduct = async (dispatch, id) => {
  dispatch({ type: FETCHING_PRODUCT_REQUEST });

  try {
    const { data: matchedProduct } = await axios.get(
      `http://localhost:1337/products/${id}`
    );

    dispatch({ type: FETCHING_PRODUCT_SUCCESS, payload: matchedProduct });
  } catch (error) {
    dispatch({
      type: FETCHING_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

export const getWishlist = (dispatch) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist'));
  const isWishlistExist = wishlist !== null;
  dispatch({ type: GET_WISHLIST, payload: isWishlistExist ? wishlist : [] });
};

export const addToWishlist = (dispatch, product) => {
  setItemToLocalStorage('wishlist', product);
  dispatch({ type: ADD_TO_WISHLIST, payload: product });
};

export const removeFromWishlist = (dispatch, id) => {
  removeItemFromLocalStorage('wishlist', id);
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { id } });
};

export const getShoppingCart = (dispatch) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  const isShoppingCartExist = shoppingCart !== null;
  dispatch({
    type: GET_SHOPPING_CART,
    payload: isShoppingCartExist ? shoppingCart : [],
  });
};

export const removeFromShoppingCart = (dispatch, id) => {
  removeItemFromLocalStorage('shoppingCart', id);
  dispatch({ type: REMOVE_FROM_SHOPPING_CART, payload: { id } });
};

export const addToShoppingCart = (dispatch, product) => {
  setItemToLocalStorage('shoppingCart', product);
  dispatch({ type: ADD_TO_SHOPPING_CART, payload: product });
};
