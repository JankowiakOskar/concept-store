import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import RestoreIcon from '@material-ui/icons/Restore';
import RedeemIcon from '@material-ui/icons/Redeem';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';

const ServicesWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: auto;
  border: 1px solid ${({ theme }) => theme.grey200};
  border-radius: 10px;
`;

const Service = styled.div`
  width: 100%;
  height: 80px;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.grey400};
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:last-of-type {
    border-bottom: none;
  }
`;

const ServiceDescription = styled.span`
  margin: 0 0 0 10px;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.small};
`;

const DeliveryIcon = styled(LocalShippingIcon)`
  ${baseIconStyle}
  fill: ${({ theme }) => theme.black} !important;
`;

const GiftIcon = styled(RedeemIcon)`
  ${baseIconStyle}
  fill: ${({ theme }) => theme.black} !important;
`;

const ReturnIcon = styled(RestoreIcon)`
  ${baseIconStyle}
  fill: ${({ theme }) => theme.black} !important;
`;

const ServicesBox = ({ className }) => {
  return (
    <ServicesWrapper className={className}>
      <Service>
        <DeliveryIcon />
        <ServiceDescription>Delivery within 3 business days</ServiceDescription>
      </Service>
      <Service>
        <GiftIcon />
        <ServiceDescription>Free shipping and return</ServiceDescription>
      </Service>
      <Service>
        <ReturnIcon />
        <ServiceDescription>14-day return policy</ServiceDescription>
      </Service>
    </ServicesWrapper>
  );
};

ServicesBox.propTypes = {
  className: PropTypes.string,
};

ServicesBox.defaultProps = {
  className: '',
};

export default ServicesBox;
