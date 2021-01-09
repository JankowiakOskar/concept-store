import React, { useContext } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';
import routes from 'routes';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as EmptyBasket } from 'assets/svgs/EmptyBasket.svg';
import { ReactComponent as WishDraw } from 'assets/svgs/WishDraw.svg';
import Button from 'components/atoms/Button/Button';

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyBasketDraw = styled(EmptyBasket)`
  width: 100%;
  height: 200px;
`;
const EmptyWishList = styled(WishDraw)`
  width: 100%;
  height: 200px;
`;

const ContentWrapper = styled.div`
  margin: 20px 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentTitle = styled.h3`
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.grey100};
  text-align: center;
`;

const ContentParagraph = styled.p`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.small};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.grey100};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 200px;
  color: ${({ theme }) => theme.grey400};
`;

const EmptyCard = ({ className, title, description, type }) => {
  const {
    sidePanel: { hideSidePanel },
  } = useContext(UIContext);
  return (
    <Wrapper className={className}>
      {type === 'wishList' ? <EmptyWishList /> : <EmptyBasketDraw />}
      <ContentWrapper>
        <ContentTitle>{title}</ContentTitle>
        {description && <ContentParagraph>{description}</ContentParagraph>}
        {type === 'shoppingCart' && (
          <StyledLink to={routes.clothes} onClick={hideSidePanel}>
            <StyledButton primary>Continue shopping</StyledButton>
          </StyledLink>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

EmptyCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['shoppingCart', 'wishList', '']),
};

EmptyCard.defaultProps = {
  className: '',
  description: '',
  type: '',
};

export default EmptyCard;
