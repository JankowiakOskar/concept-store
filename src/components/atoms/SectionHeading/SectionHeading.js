import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionHeadingWrapper = styled.div`
  padding: 0 0 20px 0;
  text-align: left;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.siteHeader};
`;

const SectionSubtitle = styled.h5`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const SectionHeading = ({ title, subtitle }) => {
  return (
    <SectionHeadingWrapper>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
    </SectionHeadingWrapper>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

SectionHeading.defaultProps = {
  subtitle: '',
};

export default SectionHeading;
