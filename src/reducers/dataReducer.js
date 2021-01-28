import bannerJacket from 'assets/images/bannerJacket.jpg';
import bannerNike from 'assets/images/bannerNike.jpg';
import bannerShoping from 'assets/images/bannerShoping.jpg';
import accessoriesCategory from 'assets/images/accessoriesCategory.jpg';
import jacketsCategory from 'assets/images/jacketsCategory.jpg';
import shoesCategory from 'assets/images/shoesCategory.jpg';
import {
  FETCHING_PRODUCTS_REQUEST,
  FETCHING_PRODUCTS_SUCCESS,
  FETCHING_PRODUCTS_FAILURE,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAILURE,
  UPDATE_ORDER_STATUS,
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_SHOPPING_CART,
  ADD_TO_SHOPPING_CART,
  REPLACE_ITEM_IN_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART,
  REMOVE_ALL_PRODUCTS,
} from 'actions/data';

export const initialState = {
  slides: [
    {
      id: '1',
      image: bannerJacket,
      title: 'We already have new winter sales 50% off',
      subTitle: 'Choose your favorite models at half price',
      btnContent: 'Buy now',
    },
    {
      id: '2',
      image: bannerNike,
      title: 'Discover your style with us',
      subTitle: 'New collection has already dropped',
      btnContent: 'Check collection',
    },
    {
      id: '3',
      image: bannerShoping,
      title: 'Improve your look with our wear',
      subTitle: 'Limited clothes available only in our store',
      btnContent: 'Shop now',
    },
  ],
  categoriesCards: [
    {
      category: 'jackets',
      image: jacketsCategory,
    },
    {
      category: 'shoes',
      image: shoesCategory,
    },
    {
      category: 'accessories',
      image: accessoriesCategory,
    },
  ],
  orderTrackingStatus: 'ORDER_NOT_REGISTERED',
  isLoadingProducts: false,
  isAllProductsFetched: false,
  numItemsRequest: 0,
  topSellingRatio: 8.2,
  products: [],
  wishlist: [],
  shoppingCart: [],
  error: {},
};

export const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCHING_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
        numItemsRequest: action.payload.numItemsRequest,
      };
    case FETCHING_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
        products: [...state.products, ...action.payload.products],
        isAllProductsFetched: action.payload.isAllProductsFetched,
        numItemsRequest: 0,
      };
    case FETCHING_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
        numItemsRequest: 0,
        error: action.payload,
      };
    case UPDATE_STORE_REQUEST:
      return {
        ...state,
        orderTrackingStatus: action.payload.orderStatus,
      };
    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        orderTrackingStatus: action.payload.orderStatus,
        shoppingCart: [],
      };
    case UPDATE_STORE_FAILURE:
      return {
        ...state,
        error: action.payload.err,
        orderTrackingStatus: action.payload.orderStatus,
      };
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, ...action.payload],
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(({ id }) => id !== action.payload.id),
      };
    case GET_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, ...action.payload],
      };
    case ADD_TO_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload.product],
        orderTrackingStatus: action.payload.orderStatus,
      };
    case REPLACE_ITEM_IN_SHOPPING_CART: {
      return {
        ...state,
        shoppingCart: action.payload.replacedItems,
        orderTrackingStatus: action.payload.orderStatus,
      };
    }
    case UPDATE_ORDER_STATUS: {
      return {
        ...state,
        orderTrackingStatus: action.payload.status,
      };
    }
    case REMOVE_FROM_SHOPPING_CART: {
      return {
        ...state,
        shoppingCart: state.shoppingCart.filter(
          ({ id, sizes_quantity: sizesQuantity }) =>
            id !== action.payload.id ||
            (id === action.payload.id && !sizesQuantity[action.payload.size])
        ),
        orderTrackingStatus:
          state.shoppingCart.length === 1
            ? action.payload.orderStatus
            : state.orderTrackingStatus,
      };
    }
    case REMOVE_ALL_PRODUCTS: {
      return {
        ...state,
        numItemsRequest: 0,
        products: [],
      };
    }
    default: {
      throw new Error(`Unhandled action: ${action.type}`);
    }
  }
};

export default initialState;
