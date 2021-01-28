import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionHeadingWrapper = styled.div`
  padding: 0 0 20px 0;
  text-align: ${({ textCenter }) => (textCenter ? 'center' : 'left')};
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.siteHeader};
`;

const SectionSubtitle = styled.h5`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

const SectionHeading = ({ className, title, subtitle, textCenter }) => {
  return (
    <SectionHeadingWrapper textCenter={textCenter} className={className}>
      <SectionTitle>{title}</SectionTitle>
      <SectionSubtitle>{subtitle}</SectionSubtitle>
    </SectionHeadingWrapper>
  );
};

SectionHeading.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  textCenter: PropTypes.bool,
};

SectionHeading.defaultProps = {
  subtitle: '',
  className: '',
  textCenter: false,
};

export default SectionHeading;
