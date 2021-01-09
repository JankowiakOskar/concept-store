import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UIContext } from 'contexts/GlobalUIContext';
import { Link } from 'react-router-dom';
import routes from 'routes';
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

const StyledLink = styled(Link)`
  text-decoration: none;
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
  const {
    sidePanel: { hideSidePanel },
  } = useContext(UIContext);
  return (
    <SummaryWrapper className={className}>
      <Price>Total amount: {totalPrice} €</Price>
      <StyledLink to={routes.checkout} onClick={() => hideSidePanel()}>
        <StyledButton primary>Proceed to checkout</StyledButton>
      </StyledLink>
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
