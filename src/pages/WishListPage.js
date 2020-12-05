import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import WishListTemplate from 'templates/WhisListTemplate';
import ProductCard from 'components/molecules/ProductCard/ProductCard';
import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100vh;
`;

const WishListPage = () => {
  const {
    data: { wishlist },
    removeFromWishlist,
  } = useContext(StoreContext);

  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Wishlist" />
        <WishListTemplate>
          {wishlist.map(({ id, name, price, picture: { url } }) => (
            <ProductCard
              key={name}
              id={id}
              name={name}
              price={price}
              pictureURL={url}
              cardType="wishedCard"
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </WishListTemplate>
      </Wrapper>
    </TransitionProvider>
  );
};

export default WishListPage;
