import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { initialState, dataReducer } from 'reducers/dataReducer';
import {
  fetchProducts as fetchProductsAction,
  fetchProductsWithParams as fetchProductsWithParamsAction,
  addToWishlist,
  removeFromWishlist,
  getWishlist as getWishlistAction,
  getShoppingCart as getShoppingCartAction,
  addToShoppingCart as addToShoppingCartAction,
  updateStore as updateStoreAction,
  updateOrderStatus as updateOrderStatusAction,
  removeFromShoppingCart as removeFromShoppingCartAction,
  removeAllProducts as removeAllProductsActions,
} from 'actions/data';
import { getFromArrByID } from 'helpers';

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  const [choosenID, setChoosenID] = useState('');
  const { products, shoppingCart, wishlist, highlightedProducts } = data;
  const allProducts = [...products, ...highlightedProducts];
  const orderStatus = {
    notRegistered: 'ORDER_NOT_REGISTERED',
    pending: 'ORDER_PENDING',
    completed: 'ORDER_COMPLETED',
  };

  const numProductsInCart = shoppingCart.reduce((acc, product) => {
    const { sizes_quantity: sizesQuantity } = product;
    const [amount] = Object.values(sizesQuantity);
    // eslint-disable-next-line no-param-reassign
    acc += amount;
    return acc;
  }, 0);

  const fetchProductsWithParams = (queryParam) => {
    fetchProductsWithParamsAction(dispatch, queryParam);
  };

  const fetchProducts = (filters, currentProducts) =>
    fetchProductsAction(dispatch, filters, currentProducts);

  const getWishlist = () => getWishlistAction(dispatch);

  const getShoppingCart = () => getShoppingCartAction(dispatch);

  const updateStore = (productsArr) =>
    updateStoreAction(dispatch, productsArr, orderStatus);

  const addToShoppingCart = (product) =>
    addToShoppingCartAction(dispatch, shoppingCart, product, orderStatus);

  const removeFromShoppingCart = (id, size) => {
    removeFromShoppingCartAction(dispatch, id, size, orderStatus);
  };

  const removeAllProducts = () => removeAllProductsActions(dispatch);

  const updateOrderStatus = (status) =>
    updateOrderStatusAction(dispatch, status);

  const handleWishlist = (id, productsArr = allProducts) => {
    const choosenProduct = getFromArrByID(productsArr, id);
    const isOnWishlist = wishlist.some((product) => product.id === id);
    return isOnWishlist
      ? removeFromWishlist(dispatch, id)
      : addToWishlist(dispatch, choosenProduct);
  };

  const setSelectedID = (id) => setChoosenID(id);

  useEffect(() => {
    getWishlist();
    getShoppingCart();
  }, []);

  const values = {
    dispatch,
    data,
    allProducts,
    handleWishlist,
    addToShoppingCart,
    removeFromShoppingCart,
    updateStore,
    orderStatus,
    fetchProducts,
    fetchProductsWithParams,
    updateOrderStatus,
    removeAllProducts,
    setSelectedID,
    choosenID,
    shoppingCartAmount: numProductsInCart,
  };

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default StoreProvider;
