import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';

const SearchWrapper = styled(motion.div)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.grey200};

  ${({ onNavBar }) =>
    onNavBar &&
    css`
      position: relative;
      border: none;
      input {
        padding: 0 60px 0 20px;
        transform-origin: center right;
        border: 1px solid ${({ theme }) => theme.black};
        border-radius: 15px;
        background-color: transparent;
        outline: none;

        &:focus {
          border: 2px solid ${({ theme }) => theme.black};
        }

        &::placeholder {
          color: ${({ theme }) => theme.black};
        }
      }

      button {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        background-color: transparent;
        border: none;
        outline: none;
      }

      svg {
        fill: ${({ theme }) => theme.black} !important;
      }
    `}
`;

const SearchInput = styled(motion.input)`
  padding: 0 0 0 20px;
  flex: 1;
  height: 100%;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.grey100};
  }

  ${({ onNavBar }) =>
    !onNavBar &&
    css`
      transform: scale(1) !important;
      opacity: 1 !important;
    `}
`;

const SearchIconButton = styled(motion.button)`
  height: 100%;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: none;
  background-color: ${({ theme }) => theme.black};
`;

const StyledSearchIcon = styled(SearchIcon)`
  ${baseIconStyle};
  fill: ${({ theme }) => theme.white} !important;
`;

const inputVariants = {
  animate: {
    opacity: [0, 0.5, 1],
    scaleX: 1,
    transition: {
      type: 'easeIn',
      duration: 0.4,
    },
  },

  closed: {
    scaleX: [1, 0],
    opacity: [1, 0],

    transition: {
      type: 'easeOut',
      duration: 0.4,
    },
  },
};

const SearchBar = ({ onNavBar, value, setValue }) => {
  const [isOpen, setOpen] = useState(false);
  const handleChange = (e) => setValue(e.target.value);

  return (
    <SearchWrapper onNavBar={onNavBar} onMouseLeave={() => setOpen(false)}>
      <SearchInput
        onNavBar={onNavBar}
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
        variants={inputVariants}
        animate={onNavBar && isOpen ? 'animate' : 'closed'}
      />
      <SearchIconButton type="submit" onMouseEnter={() => setOpen(true)}>
        <StyledSearchIcon />
      </SearchIconButton>
    </SearchWrapper>
  );
};

SearchBar.propTypes = {
  onNavBar: PropTypes.bool,
  value: PropTypes.string,
  setValue: PropTypes.func,
};

SearchBar.defaultProps = {
  onNavBar: false,
  value: '',
  setValue: () => {},
};

export default SearchBar;
