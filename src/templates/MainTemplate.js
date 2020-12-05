import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { Normalize } from 'styled-normalize';
import GlobalStyle from 'assets/styles/GlobalStyle';
import StoreProvider from 'store/StoreProvider';
import GlobalUIProvider from 'contexts/GlobalUIContext';
import Navbar from 'components/organisms/NavBar/NavBar';
import SidePanel from 'components/organisms/SidePanel/SidePanel';

const MainTemplate = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <GlobalUIProvider>
            <Normalize />
            <GlobalStyle />
            <Navbar />
            <SidePanel />
            {children}
          </GlobalUIProvider>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node,
};

MainTemplate.defaultProps = {
  children: [],
};

export default MainTemplate;
