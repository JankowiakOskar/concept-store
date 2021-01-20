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

  ${({ theme }) => theme.mq.tablet} {
    flex-direction: row;
    flex-wrap: wrap;

    *:nth-child(1) {
      flex-basis: 100%;
    }

    * {
      flex-basis: 49%;
    }
  }

  ${({ theme }) => theme.mq.desktop} {
    *,
    *:nth-child(1) {
      flex-basis: 32%;
    }
  }
`;

const CategoriesTemplate = ({ children }) => {
  return <CategoriesWrapper>{children}</CategoriesWrapper>;
};

CategoriesTemplate.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesTemplate;
