import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { makeCapitalWord } from 'helpers';

const CheckBoxElementWrapper = styled.div`
  width: 130px;
  margin: 0 50px;
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckBoxLabel = styled.label`
  width: 100%;
  position: relative;
  margin: 0 0 0 30px;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  display: inline-flex;
  align-items: center;
  justify-content: space-between;

  &:after {
    content: '\\2713';
    color: ${({ theme }) => theme.white};
    font-weight: ${({ theme }) => theme.bold};
    position: absolute;
    left: -30px;
    top: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translate(0, -50%);
    border: 1px solid ${({ theme }) => theme.grey100};
    width: 20px;
    height: 20px;
    transition: all 0.15s ease;
    border-radius: 3px;

    ${({ isChecked }) =>
      isChecked &&
      css`
        background-color: ${({ theme }) => theme.primary};
      `}
  }
`;

const ProductNum = styled.span``;

const CheckBoxElement = ({
  name,
  description,
  productsNum,
  className,
  toggleCheckbox,
  value,
}) => {
  return (
    <CheckBoxElementWrapper
      onClick={() => toggleCheckbox(name)}
      className={className}
    >
      <Checkbox type="checkbox" name={name} value={value} />
      <CheckBoxLabel htmlFor={name} isChecked={value}>
        {makeCapitalWord(description)}{' '}
        {productsNum && <ProductNum>({productsNum})</ProductNum>}
      </CheckBoxLabel>
    </CheckBoxElementWrapper>
  );
};

CheckBoxElement.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  productsNum: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.bool,
  toggleCheckbox: PropTypes.func.isRequired,
};

CheckBoxElement.defaultProps = {
  className: '',
  value: false,
  productsNum: '',
};

export default CheckBoxElement;
