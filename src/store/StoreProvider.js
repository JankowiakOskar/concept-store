import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { initialState, dataReducer } from 'reducers/dataReducer';
import {
  getProducts as getProductsAction,
  addToWishlist,
  removeFromWishlist,
  getWishlist as getWishlistAction,
  getShoppingCart as getShoppingCartAction,
  addToShoppingCart as addToShoppingCartAction,
  updateStore as updateStoreAction,
  removeFromShoppingCart as removeFromShoppingCartAction,
  removeAllProducts as removeAllProductsActions,
} from 'actions/data';
import { getFromArrByID } from 'helpers';

export const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialState);
  const [choosenID, setChoosenID] = useState('');

  const { products, shoppingCart, wishlist } = data;
  const updateStoreActions = {
    removeFromStore: 'remove',
    addToStore: 'add',
  };

  const numProductsInCart = shoppingCart.reduce((acc, product) => {
    const { sizes_quantity: sizesQuantity } = product;
    const [amount] = Object.values(sizesQuantity);
    // eslint-disable-next-line no-param-reassign
    acc += amount;
    return acc;
  }, 0);

  const fetchProducts = (filters, currentProducts) =>
    getProductsAction(dispatch, filters, currentProducts);

  const getWishlist = () => getWishlistAction(dispatch);

  const getShoppingCart = () => getShoppingCartAction(dispatch);

  const updateStore = (id, actionType, valuesObj) =>
    updateStoreAction(dispatch, id, actionType, valuesObj);

  const addToShoppingCart = (product) =>
    addToShoppingCartAction(dispatch, shoppingCart, product);

  const removeFromShoppingCart = (id, size) => {
    removeFromShoppingCartAction(dispatch, id, size);
  };

  const removeAllProducts = () => removeAllProductsActions(dispatch);

  const handleWishlist = (id, productsArr = products) => {
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
    fetchProducts();
  }, []);

  const values = {
    data,
    handleWishlist,
    addToShoppingCart,
    removeFromShoppingCart,
    updateStore,
    updateStoreActions,
    fetchProducts,
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
