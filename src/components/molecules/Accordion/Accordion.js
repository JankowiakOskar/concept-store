import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.5px solid ${({ theme }) => theme.grey100};
`;

const AccordionHeader = styled.div`
  padding: 0 20px;
  height: 50px;
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
  max-height: 0;
  overflow: hidden;
  ${({ isCollapse }) =>
    isCollapse &&
    css`
      overflow: auto;
      max-height: 9999px;
    `}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.grey300};
`;
const ListElement = styled.li`
  margin: 5px 0;
`;

const listVariants = {
  hidden: {
    opacity: 0,
    maxHeight: 0,
  },
  vissible: {
    opacity: 1,
    maxHeight: 200,
    transform: {
      type: 'easeOut',
      duration: 0.05,
    },
  },
  exit: {
    opacity: 0,
    maxHeight: 0,
    transform: {
      type: 'easeOut',
      duartion: 0.2,
    },
  },
};

const Accordion = ({ title, list }) => {
  const [isCollapse, setCollapse] = useState(false);

  const handleClick = () => setCollapse(!isCollapse);
  return (
    <AccordionWrapper onClick={handleClick}>
      <AccordionHeader>
        {title} <ArrowIcon collapse={isCollapse ? 1 : 0} />
      </AccordionHeader>
      <AnimatePresence exitBeforeEnter>
        {isCollapse && (
          <AccordionList
            variants={listVariants}
            initial="hidden"
            animate="vissible"
            exit="exit"
          >
            {list.map(({ name, path }) => (
              <StyledLink key={name} to={path}>
                <ListElement>{name}</ListElement>
              </StyledLink>
            ))}
          </AccordionList>
        )}
      </AnimatePresence>
    </AccordionWrapper>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default Accordion;
