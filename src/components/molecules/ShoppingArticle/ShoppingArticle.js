/* eslint-disable camelcase */
import React, { useContext, useEffect } from 'react';
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

const ArticleWrapper = styled.article`
  margin: 5px 10px;
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

const ImageWrapper = styled.div`
  grid-area: image;
  border: 1px solid ${({ theme }) => theme.grey400};
  border-radius: 10px;
`;

const ArticleImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const DetailsGroup = styled.div`
  grid-area: details;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: all 0.2s ease-in;
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.6)};
`;

const ItemTitle = styled.h3`
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.regular};
`;

const Size = styled.span`
  color: ${({ theme }) => theme.grey200};
  font-size: ${({ theme }) => theme.font.size.small};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const StyledCounterQuantity = styled(CounterQuantity)`
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

const ShoppingArticle = ({
  id,
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
    <ArticleWrapper className={className}>
      <ImageWrapper>
        <ArticleImg src={`http://192.168.100.17:8001${pictureURL}`} />
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
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  sizesQuantity: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  pictureURL: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool,
  choosenProduct: PropTypes.objectOf(PropTypes.sha),
};

ShoppingArticle.defaultProps = {
  className: '',
  isAvailable: true,
  choosenProduct: {},
};

export default ShoppingArticle;
