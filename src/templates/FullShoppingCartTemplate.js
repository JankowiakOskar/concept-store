import React from 'react';
import styled from 'styled-components';
import Stepper from 'components/molecules/Stepper/Stepper';
import FullShoppingCart from 'components/organisms/FullShoppingCart/FullShoppingCart';

const Wrapper = styled.div`
  width: 100%;
`;

const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledStepper = styled(Stepper)`
  ${({ theme }) => theme.mq.tablet} {
    min-width: 700px;
  }
`;

const FullCartTemplate = () => {
  return (
    <Wrapper>
      <StepperWrapper>
        <StyledStepper />
      </StepperWrapper>
      <FullShoppingCart />
    </Wrapper>
  );
};

export default FullCartTemplate;
