import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Grid = styled.div`
  width: 100%;
  height: auto;
  min-height: 500px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  ${({ theme }) => theme.mq.tablet} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
  }
`;

const GridTemplate = ({ className, children }) => {
  return <Grid className={className}>{children}</Grid>;
};

GridTemplate.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

GridTemplate.defaultProps = {
  className: '',
};

export default GridTemplate;
