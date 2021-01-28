/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CounterQuantity, {
  CounterWrapper,
  CounterInput,
  ToolTip,
} from 'components/molecules/CounterQuantity/CounterQuantity';
import { arrObjectsFromObjectPairs, getKeyMatchedValue } from 'helpers';

export const ArticleWrapper = styled(motion.article)`
  margin: 20px 10px;
  padding: 10px;
  position: relative;
  max-height: 200px;
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  grid-template-areas: 'image details';
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.grey400};
  border-radius: 10px;
`;

export const ImageWrapper = styled.div`
  max-height: 200px;
  grid-area: image;
  border: 1px solid ${({ theme }) => theme.grey400};
  border-radius: 10px;
`;

export const ArticleImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export const DetailsGroup = styled.div`
  max-height: 200px;
  grid-area: details;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: all 0.2s ease-in;
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.6)};
`;

export const ItemTitle = styled.h3`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.regular};
`;

export const Size = styled.span`
  color: ${({ theme }) => theme.grey200};
  font-size: ${({ theme }) => theme.font.size.small};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const StyledCounterQuantity = styled(CounterQuantity)`
  min-height: 60px;
  ${CounterWrapper} {
    margin: 5px 0 0;
    height: 30px;
    width: 100px;
  }

  ${CounterInput} {
    font-size: 20px;
    flex-basis: 33%;
  }

  ${ToolTip} {
    left: -20px;
  }
`;

const DeleteIcon = styled(DeleteForeverIcon)`
  position: absolute;
  top: 8px;
  right: 1px;
  font-size: 2.5rem !important;
  fill: ${({ theme }) => theme.grey100} !important;
  cursor: pointer;

  &:hover {
    fill: ${({ theme }) => theme.black} !important;
  }
`;

const articlesVariants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  visible: (index) => ({
    opacity: [0, 1],
    x: [-30, 0],
    transition: {
      delay: index * 0.2,
      type: 'easeIn',
    },
  }),
  exit: {
    opacity: [1, 0],
    x: [0, -100],
    transition: {
      type: 'easeOut',
      duration: 0.3,
    },
  },
};

const ShoppingArticle = ({
  id,
  customKey,
  index,
  name,
  price,
  sizesQuantity,
  pictureURL,
  className,
  isAvailable,
  choosenProduct,
}) => {
  const { addToShoppingCart, removeFromShoppingCart } = useContext(
    StoreContext
  );

  const [{ size, amount }] = arrObjectsFromObjectPairs(
    sizesQuantity,
    'size',
    'amount'
  );

  const handleUpdateItem = (newAmount) => {
    const product = choosenProduct;
    const { sizes_quantity } = product;
    const arrSizesAmounts = arrObjectsFromObjectPairs(
      sizes_quantity,
      'size',
      'amount'
    );
    const hasSizesAmounts = arrSizesAmounts.some(
      (item) => item.size === size && item.amount >= amount
    );
    return (
      hasSizesAmounts &&
      addToShoppingCart({
        ...product,
        sizes_quantity: { [size]: newAmount },
      })
    );
  };

  const totalPrice = (cost, quantity) => (cost * quantity).toFixed(2);

  useEffect(() => {
    if (!isAvailable) {
      setTimeout(() => removeFromShoppingCart(id, size), 1500);
    }
  }, [isAvailable, id, size, removeFromShoppingCart]);

  return (
    <ArticleWrapper
      className={className}
      layout
      key={customKey}
      custom={index}
      variants={articlesVariants}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <ImageWrapper>
        <ArticleImg src={pictureURL} />
      </ImageWrapper>
      <DetailsGroup isAvailable={isAvailable}>
        <ItemTitle>{isAvailable ? name : 'Product not available'}</ItemTitle>
        <Size>Size: {size.toUpperCase()}</Size>
        <Price>{totalPrice(price, +amount)} €</Price>
        <StyledCounterQuantity
          quantity={+amount}
          limitQuantity={
            Object.keys(choosenProduct).length &&
            +getKeyMatchedValue(choosenProduct.sizes_quantity, size)
          }
          setQuantity={handleUpdateItem}
        />
      </DetailsGroup>
      <DeleteIcon onClick={() => removeFromShoppingCart(id, size)} />
    </ArticleWrapper>
  );
};

ShoppingArticle.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  customKey: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sizesQuantity: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  pictureURL: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool,
  choosenProduct: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ])
  ),
};

ShoppingArticle.defaultProps = {
  className: '',
  isAvailable: true,
  choosenProduct: {},
};

export default ShoppingArticle;
