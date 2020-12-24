import PropTypes from 'prop-types';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import { Normalize } from 'styled-normalize';
import GlobalStyle from 'assets/styles/GlobalStyle';
import StoreProvider from 'store/StoreProvider';
import GlobalUIProvider from 'contexts/GlobalUIContext';
import FilterProvider from 'contexts/FilterContext';
import Navbar from 'components/organisms/NavBar/NavBar';
import SidePanel from 'components/organisms/SidePanel/SidePanel';
import Footer from 'components/organisms/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainTemplate = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <GlobalUIProvider>
            <FilterProvider>
              <Normalize />
              <GlobalStyle />
              <Navbar />
              <SidePanel />
              {children}
              <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Footer />
            </FilterProvider>
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
