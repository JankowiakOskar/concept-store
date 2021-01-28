import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import routes from 'routes';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import CheckoutTemplate from 'templates/CheckoutTemplate';
import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto 120px;
  padding: 80px 20px 0px;
  width: 100%;

  ${({ theme }) => theme.mq.bigTablet} {
    padding: 80px 40px 0;
  }
`;

const CheckoutPage = () => {
  const {
    data: { shoppingCart },
  } = useContext(StoreContext);

  return (
    <>
      {shoppingCart.length ? (
        <TransitionProvider>
          <Wrapper>
            <PageHeader title="Checkout" />
            <CheckoutTemplate />
          </Wrapper>
        </TransitionProvider>
      ) : (
        <Redirect to={routes.home} />
      )}
    </>
  );
};

export default CheckoutPage;
