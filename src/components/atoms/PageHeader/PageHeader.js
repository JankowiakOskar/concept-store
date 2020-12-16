import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
`;
const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.font.size.siteHeader};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.black};
`;

const PageHeader = ({ title }) => (
  <Wrapper>
    <PageTitle>{title}</PageTitle>
  </Wrapper>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
