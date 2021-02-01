import React, { useContext, useEffect } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { updateOrderStatus } from 'actions/data';
import styled from 'styled-components';
import TransitionProvider from 'providers/TransitionProvider';
import OrderCompleteTemplate from 'templates/OrderCompleteTemplate';

const Wrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  padding: 160px 20px 0;
  width: 100%;

  ${({ theme }) => theme.mq.bigTablet} {
    padding: 160px 40px 0;
  }
`;

const OrderCompletePage = () => {
  const { dispatch, orderStatus } = useContext(StoreContext);

  useEffect(() => {
    return () => updateOrderStatus(dispatch, orderStatus.notRegistered);
  }, [dispatch, orderStatus.notRegistered]);

  return (
    <TransitionProvider>
      <Wrapper>
        <OrderCompleteTemplate />
      </Wrapper>
    </TransitionProvider>
  );
};

export default OrderCompletePage;
