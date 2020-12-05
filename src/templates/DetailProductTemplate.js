import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddCartForm from 'components/organisms/AddCartForm/AddCartForm';
import { arrObjectsFromObjectPairs } from 'helpers';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
`;

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 400px;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  margin: 20px 0 0 0;
`;

const TitleProduct = styled.h3``;

const Price = styled.span``;

const DetailProductTemplate = ({ product }) => {
  const {
    name,
    price,
    picture: { url },
    sizes_quantity: sizesQuantity,
  } = product;

  const productFormated = {
    ...product,
    sizes_quantity: arrObjectsFromObjectPairs(sizesQuantity, 'size', 'amount'),
  };
  return (
    <Wrapper>
      <DetailWrapper>
        <ImageWrapper>
          <Image src={`http://localhost:1337${url}`} />
        </ImageWrapper>
        <DescriptionWrapper>
          <TitleProduct>{name}</TitleProduct>
          <Price>{price} €</Price>
          <AddCartForm product={productFormated} />
        </DescriptionWrapper>
      </DetailWrapper>
    </Wrapper>
  );
};

DetailProductTemplate.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.number,
    picture: PropTypes.objectOf(PropTypes.any),
    sizes_quantity: PropTypes.objectOf(PropTypes.string),
  }),
};

DetailProductTemplate.defaultProps = {
  product: {},
};

export default DetailProductTemplate;
