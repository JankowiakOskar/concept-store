import React, { useContext } from 'react';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddCartForm from 'components/organisms/AddCartForm/AddCartForm';
import { arrObjectsFromObjectPairs } from 'helpers';
import TransitionProvider from 'providers/TransitionProvider';
import ServicesBox from 'components/molecules/ServicesBox/ServicesBox';

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
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
  margin: 10px 0 0 0;
`;

const FormWrapper = styled.div`
  margin: 10px 0;
`;

const TitleProduct = styled.h3``;

const Price = styled.span``;

const DetailProductTemplate = ({ product }) => {
  const {
    id,
    name,
    price,
    picture: { url },
    sizes_quantity: sizesQuantity,
  } = product;

  const {
    handleWishlist,
    data: { wishlist },
  } = useContext(StoreContext);

  const formatedSizesQuantity =
    sizesQuantity && arrObjectsFromObjectPairs(sizesQuantity, 'size', 'amount');

  return (
    <Wrapper>
      <DetailWrapper>
        <TransitionProvider>
          <ImageWrapper>
            <Image src={`http://192.168.100.17:1337${url}`} />
          </ImageWrapper>
        </TransitionProvider>
        <DescriptionWrapper>
          <TitleProduct>{name}</TitleProduct>
          <Price>{price} €</Price>
          <FormWrapper>
            <AddCartForm
              product={product}
              sizesQuantity={formatedSizesQuantity}
              handleWishlist={() => handleWishlist(id)}
              isOnWishlist={wishlist.some(
                (wishProduct) => wishProduct.id === id
              )}
            />
          </FormWrapper>
        </DescriptionWrapper>
        <ServicesBox />
      </DetailWrapper>
    </Wrapper>
  );
};

DetailProductTemplate.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
