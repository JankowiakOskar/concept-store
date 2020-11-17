import PropTypes from 'prop-types'
import React from 'react'
import { Normalize } from 'styled-normalize'
import GlobalStyle from 'assets/styles/GlobalStyle'

const MainTemplate = ({ children }) => {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      {children}
    </>
  )
}

MainTemplate.propTypes = {
  children: PropTypes.node,
}

MainTemplate.defaultProps = {
  children: [],
}

export default MainTemplate
