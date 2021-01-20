import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import CloseIconComponent from 'components/atoms/CloseIconComponent/CloseIconComponent';
import Modal from 'styled-react-modal';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    
  }
  50% {
    opacity: 0.8;
  }
  100%{
    opacity: 1;
    
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
  border-radius: 10px;
  box-shadow:  0px 0px 5px 0px rgba(0,0,0,0.75);
  z-index: ${({ theme }) => theme.zIndex.level10};
  animation: 0.4s ${fadeIn} ease;

  ${({ theme }) => theme.mq.tablet} {
    max-width: 500px;
    padding: 20px 60px;
  }

  ${({ theme }) => theme.mq.bigTablet} {
    
    transform: translate(-50%, -70%);
  }

  
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
