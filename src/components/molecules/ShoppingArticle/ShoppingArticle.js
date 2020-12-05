import React from 'react';
import styled from 'styled-components';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CounterQuantity from 'components/molecules/CounterQuantity/CounterQuantity';
import denimJacket from 'assets/images/denimJacket.jpg';

const ArticleWrapper = styled.article`
  position: relative;
  height: 200px;
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-template-areas: 'image details';
`;

const ImageWrapper = styled.div`
  grid-area: image;
`;

const ArticleImg = styled.img`
  object-fit: cover;
`;

const DetailsGroup = styled.div`
  grid-area: details;
`;

const ItemTitle = styled.h3``;

const Size = styled.span`
  color: ${({ theme }) => theme.grey300};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.grey100};
`;

const DeleteIcon = styled(DeleteForeverIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  fill: ${({ theme }) => theme.grey300};
`;

const ShoppingArticle = () => {
  return (
    <ArticleWrapper>
      <ImageWrapper>
        <ArticleImg src={denimJacket} />
      </ImageWrapper>
      <DetailsGroup>
        <ItemTitle>Biała czapka</ItemTitle>
        <Size>Size: M</Size>
        <Price>280 €</Price>
        <CounterQuantity />
      </DetailsGroup>
      <DeleteIcon />
    </ArticleWrapper>
  );
};

export default ShoppingArticle;
