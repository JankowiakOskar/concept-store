import React from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SkeletonCard = () => {
  return (
    <CardWrapper>
      <Skeleton variant="rect" animation="wave" width={300} height={400} />
      <Skeleton variant="text" animation="wave" width={235} height={27} />
      <Skeleton variant="text" animation="wave" width={80} height={25} />
    </CardWrapper>
  );
};

export default SkeletonCard;
