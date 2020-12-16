import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
import useOutsideClick from 'hooks/useOutsideClick';

const DropDownWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DropDownHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.grey100};
  border-radius: 10px;
  border: 1px solid
    ${({ theme, isCollapse }) =>
      isCollapse ? theme.primaryLight : theme.grey100};
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.75);
  transition: border 0.2s ease;
  cursor: pointer;

  ${({ isError }) =>
    isError &&
    css`
      border: 2px solid ${({ theme }) => theme.red};
    `}
`;

const DropDownTitle = styled.span`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 85%;
  margin: 10px 0 10px 10px;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme, isError }) => (isError ? theme.red : theme.grey100)};
  border-right: 1px solid ${({ theme }) => theme.grey200};
  transition: border 0.2s ease;
`;

const ArrowIcon = styled(KeyboardArrowDownIcon)`
  flex-basis: 15%;
  ${baseIconStyle}
  transition: transform 0.15s ease !important;
  transform: ${({ collapse }) => (collapse ? 'rotate(180deg)' : 'rotate(0)')};
`;

const DropDownList = styled(motion.ul)`
  position: absolute;
  top: 50px;
  left: 0;
  margin: 20px 0 0 0;
  list-style: none;
  width: 100%;
  border-radius: 10px;
  transform-origin: top center;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.grey200};
  box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

const DropDownElement = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
  transform: all 0.15s ease;
  cursor: pointer;

  ${({ isDisabled, theme }) =>
    isDisabled &&
    css`
      color: ${theme.grey200};
    `};
  ${({ theme }) => theme.mq.desktop} {
    &:hover {
      background-color: ${({ theme }) => theme.grey200};
      color: ${({ theme }) => theme.white};
      border-radius: 10px;
    }
  }
  &:last-child {
    border: none;
  }
`;

const Size = styled.span``;

const PiecesLeft = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Dropdown = ({ setValue, value, setError, error, list }) => {
  const [isCollapse, setCollapse] = useState(false);
  const DropDownWrapperRef = useRef(null);

  const handleOpening = () => {
    setCollapse(!isCollapse);
  };

  useOutsideClick(DropDownWrapperRef, () => setCollapse(false));

  const handleClick = (size, amount, isDisabled) => {
    if (isDisabled) return;
    setValue({ size, amount });
    if (error) setError('');
  };

  const listVariants = {
    hidden: {
      opacity: 0,
    },
    vissible: {
      opacity: [0, 0.5, 1],
      scaleY: [0, 1],
      transition: {
        type: 'easeOut',
        duration: 0.25,
      },
    },
    exit: {
      opacity: [1, 0.5, 0],
      scaleY: [1, 0],
      transition: {
        type: 'easeIn',
        duration: 0.15,
      },
    },
  };

  return (
    <DropDownWrapper ref={DropDownWrapperRef} onClick={handleOpening}>
      <DropDownHeader isError={error} isCollapse={isCollapse}>
        <DropDownTitle isError={error}>
          {error || value.toUpperCase() || 'Choose size'}
        </DropDownTitle>
        <ArrowIcon collapse={isCollapse ? 1 : 0} />
      </DropDownHeader>
      <AnimatePresence>
        {isCollapse && (
          <DropDownList
            variants={listVariants}
            initial="hidden"
            animate="vissible"
            exit="exit"
          >
            {list.map(({ size, amount }) => {
              const isDisabled = +amount <= 0;
              return (
                <DropDownElement
                  isDisabled={isDisabled}
                  key={size}
                  onClick={() => handleClick(size, amount, isDisabled)}
                >
                  <Size>{size.toUpperCase()}</Size>{' '}
                  <PiecesLeft>
                    {!isDisabled ? `Pieces left: ${amount}` : 'not avilable'}
                  </PiecesLeft>
                </DropDownElement>
              );
            })}
          </DropDownList>
        )}
      </AnimatePresence>
    </DropDownWrapper>
  );
};

Dropdown.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  setError: PropTypes.func,
  error: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
};

Dropdown.defaultProps = {
  value: '',
  error: '',
  setError: () => '',
  setValue: () => '',
  list: [],
};

export default Dropdown;
