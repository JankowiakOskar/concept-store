import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import Dropdown from 'components/molecules/Dropdown/Dropdown';
import Button from 'components/atoms/Button/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CounterQuantity, {
  CounterWrapper,
} from 'components/molecules/CounterQuantity/CounterQuantity';

const Form = styled.form`
  width: 100%;
`;

const StyledDropdown = styled(Dropdown)`
  &&& {
    max-width: none;
  }
`;

const StyledCounterQuantity = styled(CounterQuantity)`
  ${CounterWrapper} {
    margin: 20px 0 0 0;
  }
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  padding: 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 55px;
`;

const StyledShopingCartIcon = styled(ShoppingCartIcon)`
  ${baseIconStyle}
  margin: 0 10px 0 0;
  fill: ${({ theme }) => theme.white} !important;
`;

const FavoriteIconButton = styled.button`
  width: 50px;
  height: 50px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grey500};
  border: 2px solid ${({ theme }) => theme.grey100};
  border-radius: 8px;
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.75);
`;

const FavoriteIcon = styled(FavoriteBorderIcon)`
  ${baseIconStyle};
  color: ${({ $isFavorite, theme }) => $isFavorite && theme.red};
`;

const AddCartForm = ({
  product,
  sizesQuantity,
  isOnWishlist,
  handleWishlist,
}) => {
  const [choosenSize, setChoosenSize] = useState('');
  const [amountItem, setAmountItem] = useState(1);
  const [error, setError] = useState('');
  const { addToShoppingCart } = useContext(StoreContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!choosenSize) {
      const errMsg = 'Firstly, select size !';
      setError(errMsg);
    } else if (choosenSize && !error) {
      const selectedProduct = {
        ...product,
        sizes_quantity: {
          [choosenSize.size]: amountItem,
        },
      };
      addToShoppingCart(selectedProduct);
      setChoosenSize('');
      setAmountItem(1);
    }
  };

  useEffect(() => {
    if (error)
      setTimeout(() => {
        setError('');
      }, 1500);
  }, [error]);

  useEffect(() => {
    setAmountItem(1);
  }, [choosenSize]);

  useEffect(() => {
    setChoosenSize('');
  }, [product]);

  return (
    <Form>
      <StyledDropdown
        error={error}
        setError={setError}
        setValue={setChoosenSize}
        title={choosenSize.size}
        list={sizesQuantity}
        listType="sizes"
      />
      <StyledCounterQuantity
        quantity={amountItem}
        setQuantity={setAmountItem}
        limitQuantity={+choosenSize.amount}
      />
      <ButtonsWrapper>
        <StyledButton primary type="submit" onClick={handleSubmit}>
          <StyledShopingCartIcon />
          <span>Add to cart</span>
        </StyledButton>
        {handleWishlist && (
          <FavoriteIconButton type="button" onClick={handleWishlist}>
            <FavoriteIcon $isFavorite={isOnWishlist} />
          </FavoriteIconButton>
        )}
      </ButtonsWrapper>
    </Form>
  );
};

AddCartForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.objectOf(PropTypes.any),
  }),
  sizesQuantity: PropTypes.arrayOf(PropTypes.object),
  isOnWishlist: PropTypes.bool,
  handleWishlist: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

AddCartForm.defaultProps = {
  product: {},
  sizesQuantity: [{ size: '', amount: '' }],
  isOnWishlist: false,
  handleWishlist: false,
};

export default AddCartForm;
