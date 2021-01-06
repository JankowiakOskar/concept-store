import React, { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import GridTemplate from 'templates/GridTemplate';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  text-align: left;
`;

const ProductCardWrapper = styled(motion.div)`
  margin: 20px 0;
`;

const EmptyCardWrapper = styled.div`
  min-height: 50vh;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const productCardVariants = {
  hidden: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    x: [0, -50],
    transition: {
      type: 'easeOut',
      duration: 0.15,
    },
  },
};

const WishListTemplate = ({ wishlist }) => {
  const { handleWishlist } = useContext(StoreContext);

  return (
    <Wrapper isEmpty={wishlist.length}>
      <>
        {wishlist.length ? (
          <GridTemplate>
            <AnimatePresence initial={false}>
              {wishlist.map(({ id, name, price, picture: { url } }) => (
                <ProductCardWrapper
                  key={id}
                  variants={productCardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ProductCard
                    id={id}
                    name={name}
                    price={price}
                    pictureURL={url}
                    cardType="wishedCard"
                    removeFromWishlist={(ID = id) => handleWishlist(ID)}
                  />
                </ProductCardWrapper>
              ))}
            </AnimatePresence>
          </GridTemplate>
        ) : (
          <EmptyCardWrapper>
            <EmptyCard
              title="You haven't any clothes on wishlist"
              description="Let's find something with your style."
              type="wishList"
            />
          </EmptyCardWrapper>
        )}
      </>
    </Wrapper>
  );
};

WishListTemplate.propTypes = {
  wishlist: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WishListTemplate;
