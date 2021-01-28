import React from 'react';
import PropTypes from 'prop-types';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';

const SkeletonCardsProvider = ({ limitCardRender }) => {
  return Array.from({ length: `${limitCardRender}` }).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    // eslint-disable-next-line react/no-array-index-key
    <SkeletonCard key={index} />
  ));
};

SkeletonCardsProvider.propTypes = {
  limitCardRender: PropTypes.number.isRequired,
};

export default SkeletonCardsProvider;
