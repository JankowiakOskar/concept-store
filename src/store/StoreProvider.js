import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import initialState from 'reducers/dataReducer'

export const StoreContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [data] = useReducer(null, initialState)

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default StoreProvider
