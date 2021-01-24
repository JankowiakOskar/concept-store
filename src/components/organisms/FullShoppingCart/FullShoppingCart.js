import React from 'react';
import styled, { css } from 'styled-components';
import routes from 'routes';
import { Link } from 'react-router-dom';
import useShoppingCart from 'hooks/useShoppingCart';
import { sumItemsPrices, getFromArrByID, getKeyMatchedValue } from 'helpers';
import Button, {
  HoverBlackBtn,
  HoverPrimaryDarkBtn,
} from 'components/atoms/Button/Button';
import ShoppingArticle, {
  ImageWrapper,
  ArticleImg,
  DetailsGroup,
  ItemTitle,
  Size,
  Price,
  StyledCounterQuantity,
} from 'components/molecules/ShoppingArticle/ShoppingArticle';

const FlexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CartWrapper = styled.div``;

const CartHeader = styled.div`
  display: none;

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px 0;
    display: grid;
    grid-template-columns: 1fr 3fr;
    border-bottom: 1px solid ${({ theme }) => theme.grey300};
  }
`;

const MainLabel = styled.div``;

const OthersLabels = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartLabel = styled.h3`
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  text-align: center;

  &.main {
    margin: 0 0 0 40px;
    text-align: left;
  }
`;

const CartBody = styled.div`
  width: 100%;
`;

const StyledShoppingArticle = styled(ShoppingArticle)`
  && {
    margin: 20px 0;
  }

  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: 0.92fr 3fr;
    border: none;
    border-radius: 0%;
    border-bottom: 1px solid ${({ theme }) => theme.grey300};

    ${ImageWrapper} {
      max-height: 180px;
      max-width: 180px;
      border: none;
    }

    ${ArticleImg} {
      object-fit: contain;
    }

    ${DetailsGroup} {
      margin: 0 0 0 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-template-areas: 'description size amount total-price';
    }

    ${ItemTitle} {
      grid-area: description;
      ${FlexCenter}
    }

    ${Size} {
      grid-area: size;
      ${FlexCenter}
    }

    ${StyledCounterQuantity} {
      grid-area: amount;
      ${FlexCenter}
    }

    ${Price} {
      grid-area: total-price;
      ${FlexCenter}
    }
  }

  ${({ theme }) => theme.mq.dektop} {
  }
`;

const CartFooter = styled.div`
  margin: 30px 0 0 0;
  padding: 15px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.grey400};

  ${({ theme }) => theme.mq.tablet} {
    align-items: flex-end;
    border: none;
  }
`;

const CartFooterBox = styled.div`
  width: 100%;

  & > * {
    margin: 8px 0;
  }
  ${({ theme }) => theme.mq.tablet} {
    width: 300px;
  }
`;

const PriceWrapper = styled.span`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Text = styled.span``;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 8px 0;
`;

const StyledButton = styled(Button)`
  ${HoverBlackBtn}
  width: 100%;
`;

const StyledCheckoutButton = styled(Button)`
  ${HoverPrimaryDarkBtn}
  width: 100%;
`;

const FullShopingCart = () => {
  const { shoppingCart, availableProducts } = useShoppingCart();
  const totalPrice = sumItemsPrices(shoppingCart);

  return (
    <CartWrapper>
      <CartHeader>
        <MainLabel>
          <CartLabel className="main">Product</CartLabel>
        </MainLabel>
        <OthersLabels>
          <CartLabel>Description</CartLabel>
          <CartLabel>Size</CartLabel>
          <CartLabel>Amount</CartLabel>
          <CartLabel>Total Price</CartLabel>
        </OthersLabels>
      </CartHeader>
      <CartBody>
        {shoppingCart.map((product, index) => {
          const {
            id,
            name,
            price,
            sizes_quantity: sizesQuantity,
            picture: {
              formats: {
                small: { url },
              },
            },
          } = product;

          const [size] = Object.keys(sizesQuantity);
          const key = id + size;

          const matchedProduct =
            availableProducts.length && getFromArrByID(availableProducts, id);

          const isMatchedProductExist = Object.keys(matchedProduct).length;

          const isProductAvailableInStore = isMatchedProductExist
            ? +getKeyMatchedValue(matchedProduct.sizes_quantity, size) >=
              +getKeyMatchedValue(sizesQuantity, size)
            : true;

          return (
            <StyledShoppingArticle
              key={key}
              id={id}
              index={index}
              name={name}
              price={price}
              sizesQuantity={sizesQuantity}
              pictureURL={url}
              isAvailable={isProductAvailableInStore}
              choosenProduct={matchedProduct || {}}
            />
          );
        })}
      </CartBody>
      <CartFooter>
        <CartFooterBox>
          <PriceWrapper>
            <Text>Total price:</Text> <Text>{totalPrice} €</Text>
          </PriceWrapper>
          <PriceWrapper>
            <Text>Shipping:</Text>
            <Text>Free</Text>{' '}
          </PriceWrapper>
          <StyledLink to={routes.clothes}>
            <StyledButton outlined>Continue Shopping</StyledButton>
          </StyledLink>
          <StyledLink to={routes.checkout}>
            <StyledCheckoutButton>Proceed To Checkout</StyledCheckoutButton>
          </StyledLink>
        </CartFooterBox>
      </CartFooter>
    </CartWrapper>
  );
};

export default FullShopingCart;
