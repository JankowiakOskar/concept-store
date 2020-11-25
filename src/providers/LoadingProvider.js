import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LoadingPage from 'pages/LoadingPage'

const LoadingProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const handleLoading = () => setLoading(!isLoading)

    if (isLoading) setTimeout(handleLoading, 1200)

    return () => clearTimeout(handleLoading)
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
