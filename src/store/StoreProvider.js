import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { initialState, dataReducer } from 'reducers/dataReducer'
import {
  getProducts as getProductsAction,
  addToWishlist as addToWishlistAction,
} from 'actions/data'

export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [data, dispatch] = useReducer(dataReducer, initialState)

  const fetchProducts = () => getProductsAction(dispatch)

  const addToWishlist = (product) => addToWishlistAction(dispatch, product)

  useEffect(() => {
    fetchProducts()
  }, [])

  const values = {
    data,
    addToWishlist,
  }

  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  )
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default StoreProvider
