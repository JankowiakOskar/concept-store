import React from 'react';
import styled from 'styled-components';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import CheckoutTemplate from 'templates/CheckoutTemplate';
import TransitionProvider from 'providers/TransitionProvider';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 80px 20px;
`;

const CheckoutPage = () => {
  return (
    <TransitionProvider>
      <Wrapper>
        <PageHeader title="Checkout" />
        <CheckoutTemplate />
      </Wrapper>
    </TransitionProvider>
  );
};

export default CheckoutPage;
