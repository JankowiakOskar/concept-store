import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { sumItemsPrices, getKeyMatchedValue, getFromArrByID } from 'helpers';
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

const ShoppingCartTemplate = ({ shoppingCart }) => {
  const totalPrice = sumItemsPrices(shoppingCart);
  const [availableProducts, setAvaliableProducts] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchProduct = async (id) => {
      try {
        const { data: product } = await axios.get(
          `http://192.168.100.17:8001/products/${id}`
        );
        return product;
      } catch (err) {
        throw new Error(
          'Something went wrong or product is not available anymore'
        );
      }
    };
    const fetchAll = async () => {
      const currAvilableProducts = await Promise.all(
        shoppingCart.map(({ id }) => fetchProduct(id))
      );

      setAvaliableProducts(currAvilableProducts);
    };

    if (mounted) {
      fetchAll();
    }

    return () => {
      mounted = false;
    };
  }, [shoppingCart]);

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
                  <ArticleWrapper
                    layout
                    key={key}
                    custom={index}
                    variants={articlesVariants}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                  >
                    <ShoppingArticle
                      id={id}
                      name={name}
                      price={price}
                      sizesQuantity={sizesQuantity}
                      pictureURL={url}
                      isAvailable={isProductAvailableInStore}
                      choosenProduct={matchedProduct || {}}
                    />
                  </ArticleWrapper>
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

ShoppingCartTemplate.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object),
};

ShoppingCartTemplate.defaultProps = {
  shoppingCart: [],
};

export default ShoppingCartTemplate;
