import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIconComponent from 'components/atoms/CloseIconComponent/CloseIconComponent';
import Modal from 'styled-react-modal';

const StyledModal = Modal.styled`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 50vh;
  width: 95%;
  padding: 20px;
  background-color: ${({ theme }) => theme.white};
  overflow: scroll;
  border-radius: 10px;
  box-shadow:  0px 0px 5px 0px rgba(0,0,0,0.75);
  z-index: ${({ theme }) => theme.zIndex.level10};
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
