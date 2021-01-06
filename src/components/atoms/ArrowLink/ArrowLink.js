import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const StyledLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.medium};

  ${({ theme }) => theme.mq.bigTablet} {
    font-size: ${({ theme }) => theme.font.size.large};
  }
`;

const ArrowContainer = styled(motion.span)`
  margin: 5px 0 0 15px;
`;

const ArrowIcon = styled(ArrowForwardIosIcon)`
  color: ${({ theme }) => theme.white};

  ${({ theme }) => theme.mq.bigTablet} {
    font-size: 2.5rem !important;
  }
`;

const arrowVariants = {
  animation: {
    x: [-10, 0],
    transition: {
      yoyo: Infinity,
    },
  },
};

const ArrowLink = ({ routeURL, title }) => {
  return (
    <StyledLink to={routeURL}>
      {title}
      <ArrowContainer variants={arrowVariants} animate="animation">
        <ArrowIcon />
      </ArrowContainer>
    </StyledLink>
  );
};

ArrowLink.propTypes = {
  routeURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ArrowLink;
