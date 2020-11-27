import axios from 'axios'

export const FETCHING_PRODUCTS_REQUEST = 'FETCHING_PRODUCTS_REQUEST'
export const FETCHING_PRODUCTS_SUCCESS = 'FETCHING_PRODUCTS_SUCCESS'
export const FETCHING_PRODUCTS_FAILURE = 'FETCHING_PRODUCTS_FAILURE'

export const ADD_TO_WHISHLIST = 'ADD_TO_WHISHLIST'

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

export const addToWishlist = (dispatch, product) => {
  dispatch({ type: ADD_TO_WHISHLIST, payload: product })
}
