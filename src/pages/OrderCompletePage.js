import React, { useContext, useEffect } from 'react';
import { StoreContext } from 'store/StoreProvider';
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
  const { updateOrderStatus, orderStatus } = useContext(StoreContext);

  useEffect(() => {
    return () => updateOrderStatus(orderStatus.notRegistered);
  }, [orderStatus.notRegistered, updateOrderStatus]);

  return (
    <TransitionProvider>
      <Wrapper>
        <OrderCompleteTemplate />
      </Wrapper>
    </TransitionProvider>
  );
};

export default OrderCompletePage;
