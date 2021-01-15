import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';

export const SectionWrapper = styled.section`
  padding: 30px 0;

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px 20px;
  }
`;

const SectionTemplate = ({ className, title, subtitle, children }) => {
  return (
    <SectionWrapper className={className}>
      <SectionHeading title={title} subtitle={subtitle} />
      {children}
    </SectionWrapper>
  );
};

SectionTemplate.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,

  subtitle: PropTypes.string,
  children: PropTypes.node,
};

SectionTemplate.defaultProps = {
  className: '',
  title: '',
  subtitle: '',
  children: '',
};

export default SectionTemplate;
