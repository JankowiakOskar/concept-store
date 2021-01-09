/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { useField } from 'formik';

export const InputWrapper = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.grey100};
  transition: all 0.15s ease;

  ${({ isError }) =>
    isError &&
    css`
      color: ${({ theme }) => theme.red};
    `}
`;

const Input = styled.input`
  height: 50px;
  width: 100%;
  padding: 0 20px;
  border: 1px solid ${({ theme }) => theme.grey100};
  border-radius: 10px;
  box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.75);
  transition: box-shadow 0.15s ease;

  &:focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.primaryLight};
    box-shadow: inset 0px 0px 1px 0px ${({ theme }) => theme.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.grey200};
  }

  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${({ theme }) => theme.red};
      box-shadow: inset 0px 0px 1px 0px ${({ theme }) => theme.red};
    `}
`;

const InputElement = ({ className, label, placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && meta.error;
  return (
    <InputWrapper className={className}>
      <Label isError={isError}>{isError ? meta.error : label}</Label>
      <Input isError={isError} placeholder={placeholder} {...field} />
    </InputWrapper>
  );
};

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

InputElement.defaultProps = {
  error: '',
  value: '',
  placeholder: '',
  className: '',
};

export default InputElement;
