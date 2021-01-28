import React from 'react';
import { Link } from 'react-router-dom';
import routes from 'routes';
import styled from 'styled-components';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';
import Stepper from 'components/molecules/Stepper/Stepper';
import { ReactComponent as OrderCompleted } from 'assets/svgs/order-completed.svg';
import Button, {
  HoverBlackBtn,
  HoverPrimaryDarkBtn,
} from 'components/atoms/Button/Button';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const StyledOrderCompleted = styled(OrderCompleted)`
  width: 100%;
  height: 200px;
`;

const StyledSectionHeading = styled(SectionHeading)`
  margin: 20px 0 0;
`;

const ButtonsWrapper = styled.div`
  margin: 0 0 30px 0;
`;

const StyledButton = styled(Button)`
  margin: 0 0 10px 0;
  min-width: 300px;
  ${HoverBlackBtn}
`;

const StyledHomeBtn = styled(Button)`
  min-width: 300px;
  ${HoverPrimaryDarkBtn}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const OrderCompleteTemplate = () => {
  return (
    <Wrapper>
      <StepperWrapper>
        <StyledStepper />
      </StepperWrapper>
      <StyledOrderCompleted />
      <StyledSectionHeading
        textCenter
        title="Thanks for shopping in our store"
        subtitle="Your order has been accepted, details will be sent to your e-mail shortly"
      />
      <ButtonsWrapper>
        <StyledLink to={routes.clothes}>
          <StyledButton outlined>Buy something else</StyledButton>
        </StyledLink>
        <StyledLink to={routes.home}>
          <StyledHomeBtn primary>Go to Home Page</StyledHomeBtn>
        </StyledLink>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default OrderCompleteTemplate;
