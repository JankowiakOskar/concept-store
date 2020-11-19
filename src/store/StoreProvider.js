import React, { useReducer } from 'react'
import PropTypes from 'prop-types'
import initialState from 'reducers/dataReducer'

export const AppContext = React.createContext()

const StoreProvider = ({ children }) => {
  const [data] = useReducer(null, initialState)

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}

StoreProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default StoreProvider
