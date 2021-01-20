import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: 0.2s linear;
`;

const MotionButton = motion.custom(Button);

const StyledButton = styled(MotionButton)`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s linear;
`;

const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.primaryLight};
  z-index: -1;
  transform: scale(0);
  transition: 0.3s 0.02s ease;
  border-radius: 10px;
`;

const WrapperCard = styled(motion.div)`
  margin: 10px 0;
  position: relative;
  width: 100%;
  height: 200px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.85;

  &:hover {
    ${Span} {
      transform: scale(1) translate(0, 0);
      opacity: 0.8;
    }
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(rgba(53, 129, 200, 0.2), rgba(0, 25, 32, 0.3));
  }
`;

const cardVariants = {
  animate: {
    y: -30,
    backgroundColor: 'black',
  },
};

const CategoryCard = ({
  className,
  image,
  categoryType: categoryName,
  handleRedirect,
}) => {
  return (
    <WrapperCard
      className={className}
      onClick={() => handleRedirect(categoryName)}
      cardVariants={cardVariants}
      whileHover={{ scale: 1.15, zIndex: 2, opacity: 1 }}
      transition={{ type: 'easeIn', duration: 0.32 }}
    >
      <CategoryImg src={image} />
      <StyledButton secondary>
        {categoryName}
        <Span />
      </StyledButton>
    </WrapperCard>
  );
};

CategoryCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
  handleRedirect: PropTypes.func,
};

CategoryCard.defaultProps = {
  className: '',
  handleRedirect: () => {},
};

export default CategoryCard;
