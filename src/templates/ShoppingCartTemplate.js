import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart';
import ShoppingArticle from 'components/molecules/ShoppingArticle/ShoppingArticle';

const Wrapper = styled.div`
  margin: 80px 0;
  width: 100%;
  height: 100%;
`;

const ShoppingCartTemplate = ({ shoppingCart }) => {
  return (
    <Wrapper>
      {shoppingCart &&
        shoppingCart.map(({ id, name, price, selectedSize, picture }) => (
          <ShoppingArticle
            key={id}
            id={id}
            name={name}
            price={price}
            selectedSize={selectedSize}
            picture={picture}
          />
        ))}
      {!shoppingCart.length && (
        <EmptyCard
          title="Your cart is empty"
          description="I suggest add some clothes"
          type="shoppingCart"
        />
      )}
    </Wrapper>
  );
};

ShoppingCartTemplate.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object),
};

ShoppingCartTemplate.defaultProps = {
  shoppingCart: [],
};

export default ShoppingCartTemplate;
