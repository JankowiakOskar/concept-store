import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import styled from 'styled-components';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import WishListTemplate from 'templates/WhisListTemplate';

import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  width: 100%;
  min-height: 80vh;
`;

const InnerWrapper = styled.div`
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

const WishListPage = () => {
  const {
    data: { wishlist },
  } = useContext(StoreContext);

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
