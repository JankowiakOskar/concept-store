import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';

const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MediumBoldText = css`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.medium};
`;

const Wrapper = styled.div`
  min-width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${({ theme, withBorder }) =>
    withBorder &&
    css`
      box-shadow: 0px 0px 0.5px 0px rgba(0, 0, 0, 0.74);
      border: 1px solid ${theme.grey200};
    `}
`;

const SummaryHeading = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.grey200};
`;

const TitleSummary = styled.h3`
  ${MediumBoldText}
`;

const SummaryCost = styled.span`
  ${MediumBoldText}
`;

const BagIcon = styled(LocalMallIcon)`
  ${baseIconStyle}
  margin: 0 10px 0 0;
`;

const SummaryBody = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SummaryFooter = styled.div`
  padding: 10px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.grey200};
`;

const FooterDescription = styled.div`
  width: 100%;
  ${FlexRowSpaceBetween}
`;

const Item = styled.li`
  padding: 10px 20px;
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
`;

const ItemHeading = styled.div`
  width: 100%;
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const ItemBody = styled.div`
  width: 100%;
`;

const ItemFooter = styled.div`
  width: 100%;
  ${FlexRowSpaceBetween}
`;

const ItemPrice = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.grey200};
`;

const CartSummary = ({
  className,
  items,
  totalPrice,
  deliveryCost,
  withBorder,
}) => {
  return (
    <Wrapper withBorder={withBorder} className={className}>
      <SummaryHeading>
        <BagIcon />
        <TitleSummary>Order Summary</TitleSummary>
      </SummaryHeading>
      <SummaryBody>
        {items.map(
          ({
            id,
            name: itemName,
            sizes_quantity: sizesQuantity,
            price,
            category,
          }) => {
            const [size] = Object.keys(sizesQuantity);
            const [amount] = Object.values(sizesQuantity);
            const subtotalPrice = (price * amount).toFixed(2);
            return (
              <Item key={id + size}>
                <ItemHeading>
                  {amount} x {itemName}
                </ItemHeading>
                <ItemBody>
                  <ItemDescription>Size: {size}</ItemDescription>
                </ItemBody>
                <ItemFooter>
                  <ItemDescription>Category: {category}</ItemDescription>
                  <ItemPrice>{subtotalPrice} €</ItemPrice>
                </ItemFooter>
              </Item>
            );
          }
        )}
      </SummaryBody>
      <SummaryFooter>
        <FooterDescription>
          <TitleSummary>Delivery payment:</TitleSummary>
          <SummaryCost>{deliveryCost}</SummaryCost>
        </FooterDescription>
        <FooterDescription>
          <TitleSummary>Total:</TitleSummary>
          <SummaryCost>{totalPrice} €</SummaryCost>
        </FooterDescription>
      </SummaryFooter>
    </Wrapper>
  );
};

CartSummary.propTypes = {
  className: PropTypes.string,
  withBorder: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryCost: PropTypes.string.isRequired,
};

CartSummary.defaultProps = {
  className: '',
  withBorder: true,
};

export default CartSummary;
