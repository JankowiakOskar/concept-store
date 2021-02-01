import React from 'react';
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
  background-color: ${({ theme }) => theme.white};
`;

const wrapperVariants = {
  initial: {
    opacity: 1,
  },
  animation: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'easeIn',
      duration: 0.5,
    },
  },
};

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
      duration: 1,
    },
  },
};

const LoadingPage = () => {
  return (
    <Wrapper
      variants={wrapperVariants}
      initial="initial"
      animate="animation"
      exit="exit"
    >
      <LogoImg
        variants={logoVariants}
        initial={false}
        animate="animation"
        src={Logo}
      />
    </Wrapper>
  );
};

export default LoadingPage;
