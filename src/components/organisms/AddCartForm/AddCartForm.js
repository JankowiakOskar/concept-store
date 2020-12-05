import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import Dropdown from 'components/molecules/Dropdown/Dropdown';
import Button from 'components/atoms/Button/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CounterQuantity from 'components/molecules/CounterQuantity/CounterQuantity';

const Form = styled.form`
  width: 100%;
`;

const ButtonsWrapper = styled.div`
  max-width: 300px;
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledButton = styled(Button)`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 200px;
`;

const StyledShopingCartIcon = styled(ShoppingCartIcon)`
  ${baseIconStyle}
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
`;

const AddCartForm = ({ product }) => {
  const { sizes_quantity: sizesQuantity } = product;
  const [choosenSize, setChoosenSize] = useState({});
  const [amountItem, setAmountItem] = useState(1);
  const [error, setError] = useState('');
  const { addToShoppingCart } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!choosenSize) {
      const errMsg = 'Firstly, select size !';
      setError(errMsg);
    } else if (choosenSize && !error) {
      const choosenProduct = product;
      choosenProduct.selectedSize = choosenSize;
      addToShoppingCart(choosenProduct);
    }
  };

  useEffect(() => {
    setAmountItem(1);
  }, [choosenSize]);

  return (
    <Form>
      <Dropdown
        error={error}
        setError={setError}
        setValue={setChoosenSize}
        value={choosenSize.size}
        list={sizesQuantity}
      />
      <CounterQuantity
        quantity={amountItem}
        setQuantity={setAmountItem}
        limitQuantity={+choosenSize.amount}
      />
      <ButtonsWrapper>
        <StyledButton primary type="submit" onClick={handleSubmit}>
          <StyledShopingCartIcon />
          <span>Add to cart</span>
        </StyledButton>
        <FavoriteIconButton type="button">
          <FavoriteIcon />
        </FavoriteIconButton>
      </ButtonsWrapper>
    </Form>
  );
};

AddCartForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.objectOf(PropTypes.any),
    sizes_quantity: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)),
  }),
};

AddCartForm.defaultProps = {
  product: {},
};

export default AddCartForm;
