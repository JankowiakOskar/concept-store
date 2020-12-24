/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  setItemToLocalStorage,
  removeItemFromLocalStorage,
  sleeper,
  containerHasNewItem,
  updateSameProduct,
} from 'helpers';
import {
  limitQueryParam,
  allDataQueryParam,
  categoryQueryFilter,
} from 'helpers/queryHelpers';

export const FETCHING_PRODUCTS_REQUEST = 'FETCHING_PRODUCTS_REQUEST';
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS';
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE';

export const UPDATE_STORE_REQUEST = 'UPDATE_STORE_REQUEST';
export const UPDATE_STORE_SUCCESS = 'UPDATE_STORE_REQUEST';
export const UPDATE_STORE_FAILURE = 'UPDATE_STORE_REQUEST';

export const GET_WISHLIST = 'GET_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'ADD_TO_WHISHLIST';

export const GET_SHOPPING_CART = 'GET_SHOPPING_CART';
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART';
export const REPLACE_ITEM_IN_SHOPPING_CART = 'REPLACE_ITEM_IN_SHOPPING_CART';
export const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART';

export const REMOVE_MATCHED_PRODUCT = 'REMOVE_MATCHED_PRODUCT';
export const REMOVE_ALL_PRODUCTS = 'REMOVE_ALL_PRODUCTS';

export const limitRequest = 12;

export const getShoppingCart = (dispatch) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  const isShoppingCartExist = shoppingCart !== null;
  dispatch({
    type: GET_SHOPPING_CART,
    payload: isShoppingCartExist ? shoppingCart : [],
  });
};

export const removeFromShoppingCart = (dispatch, id, size) => {
  removeItemFromLocalStorage('shoppingCart', id, size);
  dispatch({
    type: REMOVE_FROM_SHOPPING_CART,
    payload: { id, size },
  });
};

export const addToShoppingCart = (dispatch, currShoppingCart, product) => {
  setItemToLocalStorage('shoppingCart', product);
  const currCartExist = currShoppingCart.length;
  const isSizePicked =
    currCartExist && containerHasNewItem(currShoppingCart, product);
  const replacedItems =
    isSizePicked && updateSameProduct(currShoppingCart, product);
  toast.dark('🎁 New product in the shopping cart');

  return currCartExist && isSizePicked
    ? dispatch({
        type: REPLACE_ITEM_IN_SHOPPING_CART,
        payload: replacedItems,
      })
    : dispatch({ type: ADD_TO_SHOPPING_CART, payload: product });
};

export const getProducts = async (
  dispatch,
  filters = [],
  currentProducts = []
) => {
  const anyFilterSelected = filters.length;
  const filterNames =
    anyFilterSelected && filters.map(({ categoryName }) => categoryName);

  const numItemsRequest = anyFilterSelected
    ? filters.reduce((acc, { productsNum }) => acc + productsNum, 0)
    : currentProducts.length + limitRequest;

  dispatch({
    type: FETCHING_PRODUCTS_REQUEST,
    payload: { numItemsRequest },
  });

  const endpoint = anyFilterSelected
    ? categoryQueryFilter(filterNames)
    : limitQueryParam(currentProducts, limitRequest);

  try {
    const { data: products } = await axios.get(
      `http://192.168.100.17:1337/products${endpoint}`
    );

    await sleeper(500);

    const isAllProductsFetched = endpoint.includes(allDataQueryParam);

    dispatch({
      type: FETCHING_PRODUCTS_SUCCESS,
      payload: {
        products,
        isAllProductsFetched: anyFilterSelected ? true : isAllProductsFetched,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCHING_PRODUCTS_FAILURE,
      payload: error,
    });
  }
};

export const updateStore = async (
  dispatch,
  id,
  updateActionType,
  selectedProduct
) => {
  dispatch({ type: UPDATE_STORE_REQUEST });
  try {
    const { data: productToUpdate } = await axios.get(
      `http://192.168.100.17:1337/products/${id}`
    );
    const { sizes_quantity } = productToUpdate;

    const updateAmounts = (currentState, actionType, valueToUpdate) => {
      const [updateKey] = Object.keys(valueToUpdate);
      return Object.keys(currentState).reduce((acc, key) => {
        if (key !== updateKey) {
          acc[key] = currentState[key];
        } else if (key === updateKey) {
          acc[key] =
            actionType === 'remove'
              ? String(+currentState[key] - +valueToUpdate[updateKey])
              : String(+currentState[key] + +valueToUpdate[updateKey]);
        }
        return acc;
      }, {});
    };

    const newSizesQuantity = updateAmounts(
      sizes_quantity,
      updateActionType,
      selectedProduct
    );

    const { data: updatedProduct } = await axios.put(
      `http://192.168.100.17:1337/products/${id}`,
      {
        sizes_quantity: newSizesQuantity,
      }
    );

    const choosenProduct = {
      ...updatedProduct,
      selectedProduct,
    };

    dispatch({
      type: UPDATE_STORE_SUCCESS,
      payload: updateActionType === 'remove' ? { id } : choosenProduct,
    });
  } catch (err) {
    dispatch({ type: UPDATE_STORE_FAILURE, payload: err });
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
  toast.dark('❤ New product on the wishlist');
};

export const removeFromWishlist = (dispatch, id) => {
  removeItemFromLocalStorage('wishlist', id);
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { id } });
};

export const removeExactProduct = (dispatch, id) => {
  dispatch({ type: REMOVE_MATCHED_PRODUCT, payload: id });
};

export const removeAllProducts = (dispatch) =>
  dispatch({ type: REMOVE_ALL_PRODUCTS });
