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
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
  ${({ theme }) => theme.mq.tablet} {
    max-height: 70vh;
  }

  ${({ theme }) => theme.mq.desktop} {
    min-height: 100vh;
  }
`;

const DetailWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${({ theme }) => theme.mq.tablet} {
    padding: 30px 20px;
    flex-direction: row;
    justify-content: center;
  }

  ${({ theme }) => theme.mq.desktop} {
    min-height: 100vh;
    justify-content: flex-start;
  }
`;

const OuterImageWrapper = styled.div`
  ${({ theme }) => theme.mq.tablet} {
    padding: 0 30px 0 0;
    height: 100vh;
  }
`;

const ImageWrapper = styled.div`
  min-height: 392px;
  max-height: 600px;
  max-width: 500px;
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  margin: 10px 0 0 0;

  ${({ theme }) => theme.mq.tablet} {
    margin: 0;
    display: flex;
    flex-direction: column;
    max-width: 300px;
  }

  ${({ theme }) => theme.mq.bigTablet} {
    max-width: 400px;
    margin: 0 0 0 50px;
  }

  ${({ theme }) => theme.mq.desktop} {
    margin: 0 0 0 200px;
  }
`;

const StyledServicesBox = styled(ServicesBox)`
  &&& {
    margin: 40px 0;
  }
`;

const FormWrapper = styled.div`
  margin: 10px 0;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.size.bold};

  ${({ theme }) => theme.mq.desktop} {
    font-size: ${({ theme }) => theme.font.size.large};
  }
`;

const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};

  ${({ theme }) => theme.mq.desktop} {
    font-size: ${({ theme }) => theme.font.size.medium};
  }
`;

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
        <OuterImageWrapper>
          <TransitionProvider>
            <ImageWrapper>
              <Image src={`http://192.168.100.17:8001${url}`} />
            </ImageWrapper>
          </TransitionProvider>
        </OuterImageWrapper>
        <DescriptionWrapper>
          <Title>{name}</Title>
          <Subtitle>{price} €</Subtitle>
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
          <StyledServicesBox />
        </DescriptionWrapper>
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
