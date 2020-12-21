import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CategoriesWrapper = styled.section`
  margin: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CategoriesTemplate = ({ children }) => {
  return <CategoriesWrapper>{children}</CategoriesWrapper>;
};

CategoriesTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesTemplate;
