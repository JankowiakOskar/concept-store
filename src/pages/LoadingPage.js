import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Logo from 'assets/svgs/Logo.svg';

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${({ theme }) => theme.zIndex.level10};
  background-color: ${({ theme }) => theme.white};
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
      y: {
        type: 'ease',
        duration: 1.5,
      },
      scale: {
        type: 'ease',
        duration: 1.5,
      },
      opacity: {
        type: 'ease',
        duration: 1.5,
      },
    },
  },
};

const LoadingPage = () => {
  return (
    <Wrapper>
      <LogoImg variants={logoVariants} animate="animation" src={Logo} />
    </Wrapper>
  );
};

export default LoadingPage;
