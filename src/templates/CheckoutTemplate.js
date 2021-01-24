import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import { UIContext } from 'contexts/GlobalUIContext';
import { sumItemsPrices } from 'helpers';
import useWindowWidth from 'hooks/useWindowWidth';
import styled from 'styled-components';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { UnderlineButton } from 'components/atoms/Button/Button';
import CartSummary from 'components/molecules/CartSummary/CartSummary';
import OrderForm from 'components/organisms/OrderForm/OrderForm';
import Modal from 'components/organisms/Modal/Modal';
import Stepper from 'components/molecules/Stepper/Stepper';

const Wrapper = styled.div`
  width: 100%;
`;

const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledStepper = styled(Stepper)`
  && {
    margin: 0 0 20px 0;
  }
  ${({ theme }) => theme.mq.tablet} {
    min-width: 700px;
  }
`;

const FlexWrapper = styled.div`
  ${({ theme }) => theme.mq.tablet} {
    height: auto;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const InnerWrapper = styled.div`
  position: relative;

  ${({ theme }) => theme.mq.bigTablet} {
    flex-grow: 0.5;
  }
`;

const StyledUnderlineButton = styled(UnderlineButton)`
  position: absolute;
  bottom: 1px;
  right: 0;

  ${({ theme }) => theme.mq.tablet} {
    display: none;
  }
`;

const CartSummaryWrapper = styled.div`
  margin: 67px 0 0 0;
`;

const StyledCartSummary = styled(CartSummary)`
  ${({ theme }) => theme.mq.bigTablet} {
    min-width: 400px;
    padding: 20px;
  }
`;

const CheckoutTemplate = () => {
  const {
    data: { shoppingCart },
  } = useContext(StoreContext);

  const {
    modal: {
      isOpen,
      choosenType,
      toggleModal,
      modalTypes: { cartSummary },
    },
  } = useContext(UIContext);

  const [isMatchedWidth] = useWindowWidth('(min-width: 767px)');
  const totalOrderPrice = sumItemsPrices(shoppingCart);
  return (
    <Wrapper>
      <StepperWrapper>
        <StyledStepper />
      </StepperWrapper>
      <FlexWrapper>
        <InnerWrapper>
          <OrderForm />
          <StyledUnderlineButton onClick={() => toggleModal(cartSummary)}>
            <LocalMallIcon />
            Show my order
          </StyledUnderlineButton>
        </InnerWrapper>
        {isMatchedWidth && (
          <CartSummaryWrapper>
            <StyledCartSummary
              items={shoppingCart}
              deliveryCost="Free"
              totalPrice={totalOrderPrice}
            />
          </CartSummaryWrapper>
        )}
        <Modal isOpen={isOpen} closeHandler={toggleModal}>
          {isOpen && choosenType === cartSummary && (
            <CartSummary
              withBorder={false}
              items={shoppingCart}
              deliveryCost="Free"
              totalPrice={totalOrderPrice}
            />
          )}
        </Modal>
      </FlexWrapper>
    </Wrapper>
  );
};

export default CheckoutTemplate;
