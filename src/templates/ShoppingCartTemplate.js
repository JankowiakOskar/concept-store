import React from 'react';
import { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { sumItemsPrices, getKeyMatchedValue, getFromArrByID } from 'helpers';
import useShoppingCart from 'hooks/useShoppingCart';
import TransitionProvider from 'providers/TransitionProvider';
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart';
import ShoppingArticle from 'components/molecules/ShoppingArticle/ShoppingArticle';
import CostSummary from 'components/molecules/CostSummary/CostSummary';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`;

const EmptyCardWrapper = styled.div`
  padding: 50px 0 0 0;
`;

const ArticlesWrapper = styled.div`
  flex: 1 1 auto;
  overflow: hidden auto;
`;

const StyledCostSummary = styled(CostSummary)`
  flex-shrink: 0;
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

const ShoppingCartTemplate = () => {
  const { shoppingCart, availableProducts } = useShoppingCart();

  const totalPrice = sumItemsPrices(shoppingCart);

  return (
    <Wrapper>
      {shoppingCart.length ? (
        <>
          <ArticlesWrapper exitBeforeEnter>
            <AnimatePresence>
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
                  availableProducts.length &&
                  getFromArrByID(availableProducts, id);

                const isMatchedProductExist = Object.keys(matchedProduct)
                  .length;

                const isProductAvailableInStore = isMatchedProductExist
                  ? +getKeyMatchedValue(matchedProduct.sizes_quantity, size) >=
                    +getKeyMatchedValue(sizesQuantity, size)
                  : true;

                return (
                  <ShoppingArticle
                    id={id}
                    key={key}
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
            </AnimatePresence>
          </ArticlesWrapper>
          <StyledCostSummary totalPrice={totalPrice} />
        </>
      ) : (
        <TransitionProvider>
          <EmptyCardWrapper>
            <EmptyCard
              title="Your cart is empty"
              description="I suggest add some clothes"
              type="shoppingCart"
            />
          </EmptyCardWrapper>
        </TransitionProvider>
      )}
    </Wrapper>
  );
};

export default ShoppingCartTemplate;
