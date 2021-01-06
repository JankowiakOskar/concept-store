import React from 'react';
import PropTypes from 'prop-types';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';

const SkeletonCardsProvider = ({ isLoading, limitCardRender, children }) => {
  return (
    <>
      {isLoading
        ? Array.from({ length: `${limitCardRender}` }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            // eslint-disable-next-line react/no-array-index-key
            <SkeletonCard key={index} />
          ))
        : children}
    </>
  );
};

SkeletonCardsProvider.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  limitCardRender: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default SkeletonCardsProvider;
