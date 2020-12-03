import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import routes from 'routes'
import { initialState, dataReducer } from 'reducers/dataReducer'
import {
  getProducts as getProductsAction,
  addToWishlist as addToWishlistAction,
  removeFromWishlist as removeFromWishlistAction,
  getWishlist as getWishlistAction,
  // getExactProduct as getExactProductAction,
} from 'actions/data'

export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialState)

  const { pathname } = useLocation()
  const { products } = data

  const fetchProducts = (currentProducts) =>
    getProductsAction(dispatch, currentProducts)

  const addToWishlist = (product) => addToWishlistAction(dispatch, product)

  const removeFromWishlist = (id) => removeFromWishlistAction(dispatch, id)

  const getWishlist = () => getWishlistAction(dispatch)

  useEffect(() => {
    getWishlist()
  }, [])

  useEffect(() => {
    const isClothesPagePath = routes.clothes === pathname
    if (isClothesPagePath && !products.length) fetchProducts(products)
  }, [pathname, products])

  const values = {
    data,
    addToWishlist,
    removeFromWishlist,
    fetchProducts,
  }

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default StoreProvider
