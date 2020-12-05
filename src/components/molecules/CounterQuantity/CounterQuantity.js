import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CounterWrapper = styled.div`
  position: relative;
  margin: 10px 0 0 0;
  display: flex;
  height: 50px;
  width: 150px;
`;

const CounterInput = styled.input`
  height: 100%;
  flex-basis: 33%;
  text-align: center;
  border-radius: 10px;
  background-color: transparent;
  color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.grey200 : theme.grey100};
  font-size: 35px;
  border: 1px solid ${({ theme }) => theme.grey200};
  transition: color 0.2s ease;
`;

const AmountDisplayer = styled.span`
  height: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.grey100};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  font-size: ${({ theme }) => theme.font.size.regular};
`;

const ToolTip = styled(motion.span)`
  position: absolute;
  top: 100%;
  left: 0;
  width: auto;
  text-align: center;
  width: 200px;
  padding: 5px;
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.black};
  border-radius: 10px;
  z-index: ${({ theme }) => theme.zIndex.level5};
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 35%;
    width: 10px;
    height: 10px;
    background-color: ${({ theme }) => theme.black};
    transform: rotate(45deg);
    z-index: -1;
  }
`;

const toolTipVariants = {
  animation: {
    y: [20, 0],
    opacity: [0, 1, 1, 1, 0],
    transition: {
      y: {
        type: 'ease',
        duration: 0.5,
      },
      opacity: {
        type: 'ease',
        duration: 1.5,
      },
    },
  },
};

const CounterQuantity = ({ limitQuantity, setQuantity, quantity }) => {
  const addConditionDisabling = quantity === limitQuantity || !limitQuantity;
  const subtractConditionDisabling = quantity === 1 || !limitQuantity;

  const handleCounting = (e, currNum, handler) => {
    let currentNum = currNum;
    const isIncrease = e.target.value === '+';
    const isDecrease = e.target.value === '-';
    if (isIncrease) currentNum += 1;
    else if (isDecrease) currentNum -= 1;

    return handler(currentNum);
  };
  return (
    <CounterWrapper>
      <CounterInput
        type="button"
        value="+"
        disabled={addConditionDisabling}
        isDisabled={addConditionDisabling}
        onClick={(e) => handleCounting(e, quantity, setQuantity)}
      />

      <AmountDisplayer>{quantity}</AmountDisplayer>
      <CounterInput
        type="button"
        value="-"
        disabled={subtractConditionDisabling}
        isDisabled={subtractConditionDisabling}
        onClick={(e) => handleCounting(e, quantity, setQuantity)}
      />
      {limitQuantity === quantity && (
        <ToolTip variants={toolTipVariants} animate="animation">
          Size limit reached !
        </ToolTip>
      )}
    </CounterWrapper>
  );
};

CounterQuantity.propTypes = {
  limitQuantity: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func.isRequired,
};

CounterQuantity.defaultProps = {
  quantity: 0,
};
export default CounterQuantity;
