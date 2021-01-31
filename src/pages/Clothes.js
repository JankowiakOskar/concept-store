import React, { useContext, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
import { limitRequest, fetchProducts } from 'actions/data';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import ProductsTemplate from 'templates/ProductsTemplate';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';
import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 80px 20px 0;
  width: 100%;

  ${({ theme }) => theme.mq.bigTablet} {
    padding: 80px 40px 0;
  }
`;

const StyledProductsTemplate = styled(ProductsTemplate)`
  && {
    margin: 30px 0;
  }
`;
export const CardWrapper = styled(motion.div)`
  padding: 10px 0;
`;

export const cardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.15,
      type: 'ease',
    },
  },
};

const Clothes = () => {
  const {
    dispatch,
    data: {
      products,
      wishlist,
      isLoadingProducts,
      numItemsRequest,
      isAllProductsFetched,
    },
    handleWishlist,
  } = useContext(StoreContext);
  const {
    state: { categoryFilters },
    allFilters,
    anyFilterProvided,
    isSelectedCategoryCard,
    setSelectedCategoryCard,
  } = useContext(FilterContext);
  const isMounted = useRef(null);
  const limitCardRender = isAllProductsFetched ? numItemsRequest : limitRequest;

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current && isSelectedCategoryCard && !products.length) {
      setSelectedCategoryCard(false);
      fetchProducts(dispatch, { ...allFilters, categoryFilters });
    }
    return () => {
      isMounted.current = false;
    };
  }, [
    allFilters,
    categoryFilters,
    dispatch,
    setSelectedCategoryCard,
    isSelectedCategoryCard,
    products.length,
  ]);

  useEffect(() => {
    isMounted.current = true;
    if (isMounted.current && !anyFilterProvided && !products.length) {
      fetchProducts(dispatch);
    }
    return () => {
      isMounted.current = false;
    };
  }, [dispatch, anyFilterProvided, products.length]);

  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Clothes" />
        <StyledProductsTemplate isAllProductsFetched={isAllProductsFetched}>
          {products.length > 0 && !isLoadingProducts
            ? products.map(({ id, name, price, picture: { url } }) => (
                <CardWrapper
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  key={id}
                >
                  <ProductCard
                    id={id}
                    name={name}
                    price={price}
                    pictureURL={url}
                    handleWishlist={(ID) => handleWishlist(ID)}
                    onWishlist={wishlist.some((product) => product.id === id)}
                    cardType="productCard"
                  />
                </CardWrapper>
              ))
            : Array.from({ length: limitCardRender }).map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <SkeletonCard key={index} />
              ))}
        </StyledProductsTemplate>
      </Wrapper>
    </TransitionProvider>
  );
};

export default Clothes;
