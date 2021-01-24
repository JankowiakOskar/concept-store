/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import routes from 'routes';
import BoxIcon from 'assets/icons/box.png';
import CreditCardIcon from 'assets/icons/credit-card.png';
import ShoppingCartIcon from 'assets/icons/shopping-bag.png';

const StepperWrapper = styled.div`
  max-width: 800px;
`;

const Stepper = styled.div`
  display: flex;
  min-width: 250px;
  min-height: 100px;
  justify-content: space-between;
  align-items: center;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${({ $isCompletedItem }) =>
    $isCompletedItem &&
    css`
      opacity: 0.6;
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      opacity: 0.6;
    `}
`;

const StepCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primaryLight};
  background-image: ${({ icon }) => `url(${icon})`};
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.75);
  transition: all 0.15s ease-in;

  ${({ $isCompletedItem }) =>
    $isCompletedItem &&
    css`
      cursor: pointer;
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      background-color: ${({ theme }) => theme.grey400};
    `}
`;

const StepLabel = styled.span`
  font-size: ${({ theme }) => theme.font.size.small};
  text-align: center;
  margin: 8px 0 0 0;
`;

const StepLine = styled.span`
  display: inline-flex;
  margin: 0 5px 45px 5px;
  width: 100%;
  height: 1.5px;
  background-color: ${({ theme }) => theme.grey400};

  transition: all 0.15s ease-in;

  ${({ $isCompletedItem }) =>
    $isCompletedItem &&
    css`
      background-color: ${({ theme }) => theme.primaryLight};
      opacity: 0.8;
    `}
`;

const StepperComponent = ({ className }) => {
  const [steps] = useState([
    {
      title: 'Shopping Cart',
      href: `${routes.shoppingCart}`,
      icon: ShoppingCartIcon,
    },
    {
      title: 'Checkout Order',
      href: `${routes.checkout}`,
      icon: CreditCardIcon,
    },
    { title: 'Completed Order', href: `${routes.home}`, icon: BoxIcon },
  ]);

  const { pathname } = useLocation();
  const history = useHistory();

  const isMatchedRoute = (href) => href === pathname;

  const activeIndex = steps.findIndex(({ href }) => isMatchedRoute(href));

  const handleRedirect = (href, isStepCompleted) => {
    return isStepCompleted ? history.push(href) : null;
  };
  return (
    <StepperWrapper className={className}>
      <Stepper>
        {steps.map(({ title, icon, href }, index) => {
          const isLastItem = steps.length - 1 === index;
          const isNextItem = index > activeIndex;
          const isCompletedItem = index < activeIndex;
          return (
            <React.Fragment key={title}>
              <Step
                $isCompletedItem={isCompletedItem}
                $isDisabled={isLastItem || isNextItem}
                activeIndex={index === activeIndex}
              >
                <StepCircle
                  $isCompletedItem={isCompletedItem}
                  $isDisabled={isLastItem || isNextItem}
                  onClick={() => handleRedirect(href, isCompletedItem)}
                  icon={icon}
                />
                <StepLabel>{title}</StepLabel>
              </Step>
              {!isLastItem && <StepLine $isCompletedItem={isCompletedItem} />}
            </React.Fragment>
          );
        })}
      </Stepper>
    </StepperWrapper>
  );
};

StepperComponent.propTypes = {
  className: PropTypes.string,
};

StepperComponent.defaultProps = {
  className: '',
};

export default StepperComponent;
