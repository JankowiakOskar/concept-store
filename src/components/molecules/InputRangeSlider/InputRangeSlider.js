import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const InputRangeContainer = styled.div`
  padding: 0 10px;
  .input-range__label--min,
  .input-range__label--max {
    opacity: 0;
  }
  .input-range__label--value {
    position: absolute;
    top: -4rem;
    left: -1rem;
    background-color: ${({ theme }) => theme.black};
    font-size: ${({ theme }) => theme.font.size.small};
    color: ${({ theme }) => theme.white};
    border-radius: 5px;
    width: 30px;
    height: 20px;
    display: flex;
  }
  .input-range__label-container {
    left: 0;
    width: 100%;
    text-align: center;
  }
  .input-range__track--active,
  .input-range__slider {
    background: ${({ theme }) => theme.primary};
    border-color: ${({ theme }) => theme.primary};
  }

  .input-range__track--active,
  .input-range__track--background {
    height: 0.8rem;
  }

  .input-range__slider {
    width: 2rem;
    height: 2rem;
    margin-top: -1.4rem;
    touch-action: none;
  }
`;

const InputRangeSlider = ({
  className,
  minValue,
  maxValue,
  value,
  setValue,
}) => {
  return (
    <InputRangeContainer className={className}>
      <InputRange
        draggableTrack
        step={25}
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onChange={(values) => setValue(values)}
      />
    </InputRangeContainer>
  );
};

InputRangeSlider.propTypes = {
  className: PropTypes.string,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
};

InputRangeSlider.defaultProps = {
  className: '',
};

export default InputRangeSlider;
