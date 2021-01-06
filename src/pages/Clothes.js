import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { StoreContext } from 'store/StoreProvider';
import { limitRequest } from 'actions/data';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import ProductsTemplate from 'templates/ProductsTemplate';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import SkeletonCardsProvider from 'providers/SkeletonCardProvider';
import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 80px 20px 0;
  width: 100%;

  ${({ theme }) => theme.mq.bigTablet} {
    padding: 80px 40px 0;
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 80px 100px 0;
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
  vissible: {
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 1,
    },
  },
};

const Clothes = () => {
  const {
    data: {
      products,
      wishlist,
      isLoadingProducts,
      numItemsRequest,
      isAllProductsFetched,
    },
    handleWishlist,
  } = useContext(StoreContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Clothes" />
        <StyledProductsTemplate isAllProductsFetched={isAllProductsFetched}>
          <SkeletonCardsProvider
            isLoading={isLoadingProducts}
            limitCardRender={
              isAllProductsFetched ? numItemsRequest : limitRequest
            }
          >
            {products.length > 0 &&
              !isLoadingProducts &&
              products.map(({ id, name, price, picture: { url } }) => (
                <CardWrapper
                  variants={cardVariants}
                  initial="hidden"
                  animate="vissible"
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
              ))}
          </SkeletonCardsProvider>
        </StyledProductsTemplate>
      </Wrapper>
    </TransitionProvider>
  );
};

export default Clothes;
