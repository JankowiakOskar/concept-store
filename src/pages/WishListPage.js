import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { FilterContext } from 'contexts/FilterContext';
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

const InnerWrapper = styled.div`
  padding: 0 20px;
`;

const WishListPage = () => {
  const {
    data: { wishlist, products },
    handleWishlist,
  } = useContext(StoreContext);

  const {
    state: { filteredItems },
  } = useContext(FilterContext);

  const productsArr = [...filteredItems, ...products];

  return (
    <TransitionProvider>
      <Wrapper>
        <InnerWrapper>
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
                removeFromWishlist={(ID) => handleWishlist(ID, productsArr)}
              />
            ))}
          </WishListTemplate>
        </InnerWrapper>
      </Wrapper>
    </TransitionProvider>
  );
};

export default WishListPage;
