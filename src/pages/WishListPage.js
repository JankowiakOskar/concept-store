import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import WishListTemplate from 'templates/WhisListTemplate';

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
    data: { wishlist },
  } = useContext(StoreContext);
  console.log(wishlist);
  return (
    <TransitionProvider>
      <Wrapper>
        <InnerWrapper>
          <PageHeader title="Wishlist" />
          <WishListTemplate wishlist={wishlist} />
        </InnerWrapper>
      </Wrapper>
    </TransitionProvider>
  );
};

export default WishListPage;
