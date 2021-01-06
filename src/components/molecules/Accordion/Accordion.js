import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';

const AccordionHeader = styled.div`
  padding: 10px 20px;
  width: 100%;
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ArrowIcon = styled(ArrowDropDownIcon)`
  ${baseIconStyle};
  color: ${({ theme }) => theme.white};
  transform: ${({ collapse }) => (collapse ? 'rotate(-180deg)' : 'rotate(0)')};
  transition: transform 0.2s ease !important;
`;

const AccordionList = styled(motion.ul)`
  padding: 0 20px 10px;
  list-style: none;
`;

const ListElement = styled.li``;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;

  ${({ isActive }) =>
    isActive &&
    css`
      & {
        justify-content: flex-start;
        border: none;
      }

      ${AccordionHeader} {
        font-size: ${({ theme }) => theme.font.size.siteHeader};
      }
      ${AccordionList} {
        max-height: 400px;
      }

      ${ArrowIcon} {
        display: none;
      }

      ${ListElement} {
        padding: 7px 0;
      }
    `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.grey300};
`;

const listVariants = {
  closed: {
    opacity: 0,
    maxHeight: '0px',
  },
  open: {
    opacity: 1,
    maxHeight: '200px',
    transform: {
      type: 'easeOut',
      duration: 0.05,
    },
  },
};

const Accordion = ({ isActive, title, list }) => {
  const [isCollapse, setCollapse] = useState(false);

  const handleClick = () => {
    if (isActive) return;
    setCollapse(!isCollapse);
  };

  useEffect(() => {
    setCollapse(isActive);
  }, [isActive]);

  return (
    <AccordionWrapper isActive={isActive} onClick={handleClick}>
      <AccordionHeader>
        {title} <ArrowIcon collapse={isCollapse ? 1 : 0} />
      </AccordionHeader>
      <AccordionList
        variants={listVariants}
        animate={isCollapse ? 'open' : 'closed'}
      >
        {list.map(({ name, path }) => (
          <StyledLink key={name} to={path}>
            <ListElement>{name}</ListElement>
          </StyledLink>
        ))}
      </AccordionList>
    </AccordionWrapper>
  );
};

Accordion.propTypes = {
  isActive: PropTypes.bool,
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

Accordion.defaultProps = {
  isActive: false,
};

export default Accordion;
