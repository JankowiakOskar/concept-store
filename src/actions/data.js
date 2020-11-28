import axios from 'axios'
import { setItemToLocalStorage, removeItemFromLocalStorage } from 'helpers'

export const FETCHING_PRODUCTS_REQUEST = 'FETCHING_PRODUCTS_REQUEST'
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS'
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE'

export const GET_WISHLIST = 'GET_WISHLIST'

export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST'
export const REMOVE_FROM_WISHLIST = 'ADD_TO_WHISHLIST'

export const getProducts = async (dispatch) => {
  dispatch({ type: FETCHING_PRODUCTS_REQUEST })
  try {
    const {
      data: [products],
    } = await axios.get('http://localhost:1337/products?_limit=3')

    dispatch({
      type: FETCHING_PRODUCTS_SUCCESS,
      payload: products,
    })
  } catch (error) {
    dispatch({
      type: FETCHING_PRODUCTS_FAILURE,
      payload: error,
    })
  }
}

export const getWishlist = (dispatch) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlist'))
  const isWishlistExist = wishlist !== null
  dispatch({ type: GET_WISHLIST, payload: isWishlistExist ? wishlist : [] })
}

export const addToWishlist = (dispatch, product) => {
  setItemToLocalStorage('wishlist', product)
  dispatch({ type: ADD_TO_WISHLIST, payload: product })
}

export const removeFromWishlist = (dispatch, product) => {
  removeItemFromLocalStorage('wishlist', product)
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { id: product.id } })
}
