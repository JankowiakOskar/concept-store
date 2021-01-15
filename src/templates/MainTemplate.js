import PropTypes from 'prop-types';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'assets/styles/theme';
import GlobalStyle from 'assets/styles/GlobalStyle';
import StoreProvider from 'store/StoreProvider';
import GlobalUIProvider from 'contexts/GlobalUIContext';
import FilterProvider from 'contexts/FilterContext';
import useScrollToTop from 'hooks/useScrollToTop';
import PageOverlay from 'components/molecules/PageOverlay/PageOverlay';
import Navbar from 'components/organisms/NavBar/NavBar';
import SidePanel from 'components/organisms/SidePanel/SidePanel';
import Footer from 'components/organisms/Footer/Footer';
import PartnersCarousel from 'components/organisms/PartnersCarousel/PartnersCarousel';
import SectionTemplate from 'templates/SectionTemplate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledSectionTemplate = styled(SectionTemplate)`
  &&& {
    padding: 0px 20px;
    max-width: 1500px;
    margin: 0 auto;
    @media (min-width: 767px) {
      padding: 30px 40px;
    }
  }
`;

const MainTemplate = ({ children }) => {
  useScrollToTop();
  return (
    <>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <GlobalUIProvider>
            <FilterProvider>
              <GlobalStyle />
              <PageOverlay />
              <Navbar />
              <SidePanel />
              {children}
              <StyledSectionTemplate
                title="Our partners"
                subtitle="well known brands"
              >
                <PartnersCarousel />
              </StyledSectionTemplate>

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
