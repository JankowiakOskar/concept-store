import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SectionHeading from 'components/atoms/SectionHeading/SectionHeading';

const SectionWrapper = styled.section`
  padding: 50px 0;
`;

const SectionTemplate = ({ title, subtitle, children }) => {
  return (
    <SectionWrapper>
      <SectionHeading title={title} subtitle={subtitle} />
      {children}
    </SectionWrapper>
  );
};

SectionTemplate.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

SectionTemplate.defaultProps = {
  title: '',
  subtitle: '',
  children: '',
};

export default SectionTemplate;
