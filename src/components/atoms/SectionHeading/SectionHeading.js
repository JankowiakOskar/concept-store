import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionHeadingWrapper = styled.div`
  padding: 0 0 20px 0;
  text-align: left;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.siteHeader};
`;

const SectionSubtitle = styled.h5`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const SectionHeading = ({ title, subtitle, className }) => {
  return (
    <SectionHeadingWrapper className={className}>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
    </SectionHeadingWrapper>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

SectionHeading.defaultProps = {
  subtitle: '',
  className: '',
};

export default SectionHeading;
