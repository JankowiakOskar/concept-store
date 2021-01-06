import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import denimJacket from 'assets/images/denimJacket.jpg';
import {
  ProductWrapper,
  OuterImageWrapper,
  ProductImage,
  DescriptionWrapper,
  ProductTitle,
  Price,
} from 'components/molecules/ProductCard/ProductCard';

const StyledProductImage = styled(ProductImage)`
  width: 100%;
  height: 100%;
  visibility: hidden;
  opacity: 0;
`;

const StyledSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const SkeletonCard = () => {
  return (
    <ProductWrapper>
      <OuterImageWrapper>
        <StyledProductImage src={denimJacket} />
        <StyledSkeleton width="100%" height="100%" />
      </OuterImageWrapper>
      <DescriptionWrapper>
        <ProductTitle>
          <Skeleton width={230} />
        </ProductTitle>
        <Price>
          <Skeleton width={80} />
        </Price>
      </DescriptionWrapper>
    </ProductWrapper>
  );
};

export default SkeletonCard;
