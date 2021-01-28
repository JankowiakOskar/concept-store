import React, { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import routes from 'routes';
import { useLocation } from 'react-router-dom';
import { initialState, dataReducer } from 'reducers/dataReducer';
import {
  getProducts as getProductsAction,
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
  const { pathname } = useLocation();
  const { products, shoppingCart, wishlist } = data;

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

  const fetchProducts = (filters, currentProducts) =>
    getProductsAction(dispatch, filters, currentProducts);

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

  useEffect(() => {
    const isHomeRoute = routes.home === pathname;
    if (isHomeRoute) {
      const loadDefaultProducts = () => {
        removeAllProducts();
        fetchProducts();
      };
      loadDefaultProducts();
    }
  }, [pathname]);

  const values = {
    data,
    handleWishlist,
    addToShoppingCart,
    removeFromShoppingCart,
    updateStore,
    orderStatus,
    fetchProducts,
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
