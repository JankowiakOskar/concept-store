import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import CloseIconComponent from 'components/atoms/CloseIconComponent/CloseIconComponent';
import Modal from 'styled-react-modal';

const fadeIn = keyframes`
  0% {
    opacity: 0.5;
    transform: translate(-50%, -60%);
  }
  50% {
    opacity: 0.8;
  }
  100%{
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const StyledModal = Modal.styled`

  padding: 20px;
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.white};
  overflow: auto;
  border-radius: 10px;
  box-shadow:  0px 0px 5px 0px rgba(0,0,0,0.75);
  z-index: ${({ theme }) => theme.zIndex.level10};
  transition: all 0.3s;
  animation: 0.3s ${fadeIn} ease;
`;

const CloseIconWrapper = styled.span`
  display: block;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalComponent = ({ isOpen, children, closeHandler }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={closeHandler}
      onEscapeKeydown={closeHandler}
      allowScroll={false}
    >
      <CloseIconWrapper>
        <CloseIconComponent
          handleClose={closeHandler}
          isActiveAnimation={false}
        />
      </CloseIconWrapper>
      {children}
    </StyledModal>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};

export default ModalComponent;
