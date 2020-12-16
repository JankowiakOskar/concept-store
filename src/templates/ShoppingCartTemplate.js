import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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

const ArticleWrapper = styled(motion.div)`
  margin: 20px 0;
`;

const StyledCostSummary = styled(CostSummary)`
  flex-shrink: 0;
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

const articlesVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  vissible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'ease',
      duration: 0.15,
    },
  },

  exit: {
    opacity: [1, 0],
    x: [0, -100],
    transition: {
      type: 'easeOut',
      duration: 0.3,
    },
  },
};

const ShoppingCartTemplate = ({ shoppingCart }) => {
  const calcTotal = () => {
    let totalPrice = 0;
    shoppingCart.forEach(({ price, sizes_quantity: sizesQuantity }) => {
      const [amount] = Object.values(sizesQuantity);
      const currItemPrice = amount * price;
      totalPrice += currItemPrice;
    });
    return totalPrice.toFixed(2);
  };

  return (
    <Wrapper>
      {shoppingCart.length ? (
        <>
          <ArticlesWrapper>
            <AnimatePresence initial={false}>
              {shoppingCart.map(
                ({
                  id,
                  name,
                  price,
                  sizes_quantity: sizesQuantity,
                  picture: {
                    formats: {
                      small: { url },
                    },
                  },
                }) => {
                  const [size] = Object.keys(sizesQuantity);
                  const key = id + size;
                  return (
                    <ArticleWrapper
                      key={key}
                      variants={articlesVariants}
                      initial="hidden"
                      animate="vissible"
                      exit="exit"
                    >
                      <ShoppingArticle
                        id={id}
                        name={name}
                        price={price}
                        sizesQuantity={sizesQuantity}
                        pictureURL={url}
                      />
                    </ArticleWrapper>
                  );
                }
              )}
            </AnimatePresence>
          </ArticlesWrapper>
          <StyledCostSummary totalPrice={calcTotal()} />
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

ShoppingCartTemplate.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object),
};

ShoppingCartTemplate.defaultProps = {
  shoppingCart: [],
};

export default ShoppingCartTemplate;
