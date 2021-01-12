import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const RadioInputWrapper = styled.div`
  height: 60px;
  border: 1px solid ${({ theme }) => theme.grey200};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.grey200};
  transition: all 0.15s ease-in;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      color: ${({ theme }) => theme.grey100};
      border: 1px solid ${({ theme }) => theme.grey100};
    `}
`;

const ContentWrapper = styled.div`
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RadioLabel = styled.label`
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const RadioElement = styled.input`
  opacity: 0;
  visibility: hidden;
`;

const CustomRadioInput = styled.span`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.grey200};
  transition: all 0.15s ease-in;

  ${({ isSelected }) =>
    isSelected &&
    css`
      &:after {
        content: '\\2713';
        color: ${({ theme }) => theme.white};
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: -1px;
        left: -1px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid ${({ theme }) => theme.grey100};
        background-color: ${({ theme }) => theme.primary};
      }
    `}
`;

const RadioInput = ({ label, value, setActive, className }) => {
  return (
    <RadioInputWrapper
      className={className}
      isSelected={value}
      onClick={setActive}
    >
      <ContentWrapper>
        <RadioLabel>{label}</RadioLabel>
        <RadioElement type="radio" value={value} />
        <CustomRadioInput isSelected={value} />
      </ContentWrapper>
    </RadioInputWrapper>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  className: PropTypes.string,
};

RadioInput.defaultProps = {
  className: '',
};

export default RadioInput;
