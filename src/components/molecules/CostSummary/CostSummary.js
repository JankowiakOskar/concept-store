import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import button from 'components/atoms/Button/Button';

export const SummaryWrapper = styled.div`
  padding: 10px 0 0 0;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.3);
`;

const Price = styled.p`
  color: ${({ theme }) => theme.grey100};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.m};
`;

const StyledButton = styled(button)`
  margin: 10px 0;
  background-color: ${({ theme }) => theme.black};
  width: 280px;
`;

const Taxes = styled.p`
  color: ${({ theme }) => theme.grey100};
  font-weight: ${({ theme }) => theme.font.weight.thin};
  font-size: ${({ theme }) => theme.s};
`;

const CostSummary = ({ className, totalPrice }) => {
  return (
    <SummaryWrapper className={className}>
      <Price>Total amount: {totalPrice} €</Price>
      <StyledButton primary>Proceed to checkout</StyledButton>
      <Taxes>Price including taxes</Taxes>
    </SummaryWrapper>
  );
};

CostSummary.propTypes = {
  className: PropTypes.string,
  totalPrice: PropTypes.string.isRequired,
};

CostSummary.defaultProps = {
  className: '',
};

export default CostSummary;
