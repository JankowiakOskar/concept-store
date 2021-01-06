import React, { useContext } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';

import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.level10};
  background-color: rgba(0, 0, 0, 0.5);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition: all 0.2s ease-in-out;
`;

const PageOverlay = () => {
  const { isOpen } = useContext(UIContext);

  return <Wrapper isVisible={isOpen || 0} />;
};

export default PageOverlay;
