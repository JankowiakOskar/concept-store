import React from 'react';
import PropTypes from 'prop-types';
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard';
import { CardWrapper } from 'pages/Clothes';

const SkeletonCardsProvider = ({ isLoading, limitCardRender, children }) => {
  return (
    <>
      {isLoading
        ? Array.from({ length: `${limitCardRender}` }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CardWrapper key={index}>
              <SkeletonCard />
            </CardWrapper>
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
