import bannerJacket from 'assets/images/bannerJacket.jpg'
import bannerNike from 'assets/images/bannerNike.jpg'
import bannerShoping from 'assets/images/bannerShoping.jpg'
import accessoriesCategory from 'assets/images/accessoriesCategory.jpg'
import jacketsCategory from 'assets/images/jacketsCategory.jpg'
import shoesCategory from 'assets/images/shoesCategory.jpg'
import {
  FETCHING_PRODUCTS_REQUEST,
  FETCHING_PRODUCTS_SUCCESS,
  FETCHING_PRODUCTS_FAILURE,
  GET_WISHLIST,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from 'actions/data'

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
  categories: [
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
  isLoadingProducts: false,
  products: [],
  isAllProductsFetched: false,
  wishlist: [],
  shoppingBasket: [],
  error: {},
}

export const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCHING_PRODUCTS_REQUEST:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
      }
    case FETCHING_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
        products: [...state.products, ...action.payload.products],
        isAllProductsFetched: action.payload.isAllProductsFetched,
      }
    case FETCHING_PRODUCTS_FAILURE:
      return {
        ...state,
        isLoadingProducts: !state.isLoadingProducts,
        error: action.payload,
      }
    case GET_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, ...action.payload],
      }
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      }
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter(({ id }) => id !== action.payload.id),
      }
    default: {
      throw new Error(`Unhandled action: ${action.type}`)
    }
  }
}

export default initialState
