import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LoadingPage from 'pages/LoadingPage'

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoading) setTimeout(() => setLoading(!isLoading), 1200)
  }, [isLoading])

  return isLoading ? <LoadingPage /> : children
}

LoadingProvider.propTypes = {
  children: PropTypes.node,
}

LoadingProvider.defaultProps = {
  children: {},
}

export default LoadingProvider
