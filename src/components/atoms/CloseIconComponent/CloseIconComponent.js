import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';
import CloseIcon from '@material-ui/icons/Close';

const closeIconVariants = {
  initial: {
    rotate: 0,
    scale: 1,
    transition: {
      type: 'ease',
      duration: 0.5,
    },
  },
  animate: {
    rotate: 360,
    scale: 1.2,
    transition: {
      type: 'ease',
      duration: 0.5,
    },
  },
};

const MotionCloseIcon = motion.custom(CloseIcon);

const StyledCloseIcon = styled(MotionCloseIcon)`
  ${baseIconStyle};
  font-size: 2rem !important;
`;

const CloseIconComponent = ({ className, handleClose, isActiveAnimation }) => {
  const [isHovered, setHover] = useState(false);

  const toggleAnimation = () => {
    if (!isActiveAnimation) return;
    setHover((prevValue) => !prevValue);
  };
  return (
    <StyledCloseIcon
      className={className}
      variants={closeIconVariants}
      animate={isHovered ? 'animate' : 'initial'}
      onClick={handleClose}
      onHoverStart={toggleAnimation}
      onHoverEnd={toggleAnimation}
    />
  );
};

CloseIconComponent.propTypes = {
  handleClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  isActiveAnimation: PropTypes.bool,
};

CloseIconComponent.defaultProps = {
  className: '',
  isActiveAnimation: true,
};

export default CloseIconComponent;
