import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from 'assets/svgs/Logo.svg';

const Wrapper = styled(motion.div)`
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.level10};
  background-color: ${({ theme, vissible }) =>
    vissible ? theme.white : 'transparent'};
  opacity: ${({ vissible }) => (vissible ? '1' : '0')};
  transition: 0.2s ease-in;
`;

const LogoImg = styled(motion.img)`
  width: 250px;
`;

const logoVariants = {
  animation: {
    y: [-50, 0, -50],
    scale: [0.9, 1, 0],
    opacity: [0, 1, 0],

    transition: {
      type: 'easeIn',
      duration: 1.2,
    },
  },
};

const LoadingPage = ({ isLoading }) => {
  return (
    <Wrapper vissible={isLoading}>
      <LogoImg
        variants={logoVariants}
        initial={false}
        animate="animation"
        src={Logo}
      />
    </Wrapper>
  );
};

LoadingPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingPage;
