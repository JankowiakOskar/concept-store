import PropTypes from 'prop-types'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'assets/styles/theme'
import { Normalize } from 'styled-normalize'
import GlobalStyle from 'assets/styles/GlobalStyle'
import StoreProvider from 'store/StoreProvider'
import Navbar from 'components/organisms/NavBar/NavBar'

const MainTemplate = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Normalize />
          <GlobalStyle />
          <Navbar />
          {children}
        </StoreProvider>
      </ThemeProvider>
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
