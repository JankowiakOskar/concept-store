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
  getFromArrByID,
} from 'helpers';
import {
  limitQueryParam,
  allDataQueryParam,
  categoryQueryFilter,
  sortQueryFilter,
  priceQueryFilter,
  searchQueryParam,
} from 'helpers/queryHelpers';

export const FETCHING_PRODUCTS_REQUEST = 'FETCHING_PRODUCTS_REQUEST';
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS';
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE';

export const FETCHING_HIGHLIGHTED_PRODUCTS_REQUEST =
  'FETCHING_HIGHLIGHTED_PRODUCTS_REQUEST';
export const FETCHING_HIGHLIGHTED_PRODUCTS_SUCCESS =
  'FETCHING_HIGHLIGHTED_PRODUCTS_SUCCESS';
export const FETCHING_HIGHLIGHTED_PRODUCTS_FAILURE =
  'FETCHING_HIGHLIGHTED_PRODUCTS_FAILURE';

export const UPDATE_STORE_REQUEST = 'UPDATE_STORE_REQUEST';
export const UPDATE_STORE_SUCCESS = 'UPDATE_STORE_SUCCESS';
export const UPDATE_STORE_FAILURE = 'UPDATE_STORE_FAILURE';

export const GET_WISHLIST = 'GET_WISHLIST';
export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'ADD_TO_WHISHLIST';

export const GET_SHOPPING_CART = 'GET_SHOPPING_CART';
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART';
export const REPLACE_ITEM_IN_SHOPPING_CART = 'REPLACE_ITEM_IN_SHOPPING_CART';
export const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART';

export const REMOVE_MATCHED_PRODUCT = 'REMOVE_MATCHED_PRODUCT';
export const REMOVE_ALL_PRODUCTS = 'REMOVE_ALL_PRODUCTS';
export const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

export const limitRequest = 12;

export const getShoppingCart = (dispatch) => {
  const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
  const isShoppingCartExist = shoppingCart !== null;
  dispatch({
    type: GET_SHOPPING_CART,
    payload: isShoppingCartExist ? shoppingCart : [],
  });
};

export const removeFromShoppingCart = (dispatch, id, size, orderStatus) => {
  removeItemFromLocalStorage('shoppingCart', id, size);
  dispatch({
    type: REMOVE_FROM_SHOPPING_CART,
    payload: { id, size, orderStatus: orderStatus.notRegistered },
  });
};

export const addToShoppingCart = (
  dispatch,
  currShoppingCart,
  product,
  orderStatus
) => {
  setItemToLocalStorage('shoppingCart', product);
  const currCartExist = currShoppingCart.length;
  const isSizePicked =
    currCartExist && containerHasNewItem(currShoppingCart, product);
  const replacedItems =
    isSizePicked && updateSameProduct(currShoppingCart, product);

  const addNewItemActions = () => {
    toast.dark('🎁 New product in the shopping cart');
    dispatch({
      type: ADD_TO_SHOPPING_CART,
      payload: { product, orderStatus: orderStatus.pending },
    });
  };

  return currCartExist && isSizePicked
    ? dispatch({
        type: REPLACE_ITEM_IN_SHOPPING_CART,
        payload: { replacedItems, orderStatus: orderStatus.pending },
      })
    : addNewItemActions();
};

export const fetchProduct = async (id) => {
  try {
    const { data: product } = await axios.get(
      `${process.env.REACT_APP_API}/products/${id}`
    );
    return product;
  } catch (err) {
    throw new Error('Something went wrong or product is not available anymore');
  }
};

export const fetchProductsWithParams = async (dispatch, queryParam = '') => {
  dispatch({
    type: FETCHING_HIGHLIGHTED_PRODUCTS_REQUEST,
  });
  try {
    const { data: highlightedProducts } = await axios.get(
      `${process.env.REACT_APP_API}/products?${queryParam}`
    );
    await sleeper(500);
    dispatch({
      type: FETCHING_HIGHLIGHTED_PRODUCTS_SUCCESS,
      payload: {
        highlightedProducts,
      },
    });
  } catch (err) {
    dispatch({ type: FETCHING_HIGHLIGHTED_PRODUCTS_FAILURE, payload: err });
  }
};

export const fetchProducts = async (
  dispatch,
  filters = {},
  currentProducts = []
) => {
  const anyFilterProvided = Object.keys(filters).length;
  const anyCategorySelected =
    'categoryFilters' in filters && filters.categoryFilters.length;

  const isNumRequestProvided = filters.categoryFilters?.some(
    (category) => category.productsNum
  );

  const categoryNames =
    anyCategorySelected &&
    filters.categoryFilters.map(({ categoryName }) => categoryName);

  const numItemsRequest =
    anyCategorySelected && isNumRequestProvided
      ? filters.categoryFilters.reduce(
          (acc, { productsNum }) => acc + productsNum,
          0
        )
      : currentProducts.length + limitRequest;

  dispatch({
    type: FETCHING_PRODUCTS_REQUEST,
    payload: { numItemsRequest },
  });

  const createEndpoint = () =>
    anyFilterProvided
      ? `?${categoryQueryFilter(categoryNames)}${priceQueryFilter(
          filters.priceFilters
        )}${searchQueryParam(filters.searchValue)}${sortQueryFilter(
          filters.sortMethod.value
        )}`
      : limitQueryParam(currentProducts, limitRequest);

  const endpoint = createEndpoint();

  try {
    const { data: products } = await axios.get(
      `${process.env.REACT_APP_API}/products${endpoint}`
    );

    await sleeper(500);

    const isAllProductsFetched = endpoint.includes(allDataQueryParam);

    dispatch({
      type: FETCHING_PRODUCTS_SUCCESS,
      payload: {
        products,
        isAllProductsFetched: anyFilterProvided ? true : isAllProductsFetched,
      },
    });
  } catch (error) {
    dispatch({
      type: FETCHING_PRODUCTS_FAILURE,
      payload: error,
    });
  }
};

export const updateStore = async (dispatch, products, orderStatus) => {
  dispatch({
    type: UPDATE_STORE_REQUEST,
    payload: { orderStatus: orderStatus.pending },
  });
  try {
    const productsOnStore = await Promise.all(
      products.map(async ({ id }) => {
        const { data: product } = await axios.get(
          `${process.env.REACT_APP_API}/products/${id}`
        );

        return product;
      })
    );

    const updatedProducts = await productsOnStore.reduce((acc, product) => {
      const { id, sizes_quantity } = product;
      const matchedProduct = getFromArrByID(products, id);
      const { sizes_quantity: selectedSizeAmount } = matchedProduct;
      const [selectedKey] = Object.keys(selectedSizeAmount);
      const updatedAmount = Object.keys(sizes_quantity).reduce((obj, key) => {
        const isKeyMatched = key === selectedKey;
        // eslint-disable-next-line no-param-reassign
        obj[key] = isKeyMatched
          ? String(+sizes_quantity[key] - +selectedSizeAmount[key])
          : sizes_quantity[key];
        return obj;
      }, {});
      const updatedProduct = { ...product, sizes_quantity: updatedAmount };
      acc.push(updatedProduct);
      return acc;
    }, []);

    await Promise.all(
      updatedProducts.map(async ({ id, sizes_quantity }) =>
        axios.put(`${process.env.REACT_APP_API}/products/${id}`, {
          sizes_quantity,
        })
      )
    );

    localStorage.removeItem('shoppingCart');

    dispatch({
      type: UPDATE_STORE_SUCCESS,
      payload: { orderStatus: orderStatus.completed },
    });
  } catch (err) {
    dispatch({
      type: UPDATE_STORE_FAILURE,
      payload: { err, orderStatus: orderStatus.notRegistered },
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

export const updateOrderStatus = (dispatch, status) => {
  dispatch({ type: UPDATE_ORDER_STATUS, payload: { status } });
};
