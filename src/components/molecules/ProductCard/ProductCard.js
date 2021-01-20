import React, { useState, useCallback, useContext } from 'react';
import { UIContext } from 'contexts/GlobalUIContext';
import { StoreContext } from 'store/StoreProvider';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { baseIconStyle } from 'components/atoms/ExternalIcon/ExternalIcon';
import routes from 'routes';
import { Link } from 'react-router-dom';

export const ProductWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;
`;

export const ProductImage = styled(motion.img)`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease-out;
  object-fit: contain;
  background-color: transparent;
  overflow: hidden;
`;

export const OuterImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const IconCardStyle = css`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

const StyledFavoriteIcon = styled(FavoriteBorderIcon)`
  ${baseIconStyle};
  ${IconCardStyle}
  transition: all 0.15s ease;
  fill: ${({ liked, theme }) =>
    liked ? `${theme.red} !important` : `${theme.grey100} !important`};

  &:hover {
    fill: ${({ theme }) => theme.red} !important;
  }
`;

const StyledDeleteIcon = styled(DeleteForeverIcon)`
  ${baseIconStyle}
  ${IconCardStyle}
  fill: ${({ theme }) => theme.grey100};
`;

const StyledAddCartIcon = styled(LocalMallIcon)`
  ${baseIconStyle};
  ${IconCardStyle};
  top: 50px;
  fill: ${({ theme }) => theme.grey100};

  ${({ theme }) => theme.mq.desktop} {
    &:hover {
      fill: ${({ theme }) => theme.primary};
    }
  }
`;

export const DescriptionWrapper = styled.div`
  margin: 10px 0 0 0;
`;
export const ProductTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const Price = styled.p``;

const ProductCard = ({
  className,
  id,
  name,
  price,
  pictureURL,
  handleWishlist,
  onWishlist,
  removeFromWishlist,
  cardType,
}) => {
  const [isFavorite, setFavorite] = useState(onWishlist);

  const {
    modal: {
      toggleModal,
      modalTypes: { addNewProduct },
    },
  } = useContext(UIContext);

  const { setSelectedID } = useContext(StoreContext);

  useCallback(() => setFavorite(onWishlist), [onWishlist]);

  const handleClickFavorite = (e, ID) => {
    setFavorite(!isFavorite);
    handleWishlist(ID);
  };

  const toggleModalProduct = (ID) => {
    toggleModal(addNewProduct);
    setSelectedID(ID);
  };

  return (
    <ProductWrapper className={className}>
      <OuterImageWrapper>
        <Link to={`${routes.clothes}/${id}`}>
          <ImageWrapper>
            <ProductImage
              src={`http://192.168.100.17:8001${pictureURL}`}
              whileHover={{ scale: 1.09 }}
              transition={{ type: 'easeIn', duration: 0.3 }}
            />
          </ImageWrapper>
        </Link>
        {cardType === 'productCard' && (
          <StyledFavoriteIcon
            liked={isFavorite ? 1 : 0}
            onClick={(e) => handleClickFavorite(e, id)}
          />
        )}
        {cardType === 'wishedCard' && (
          <StyledDeleteIcon onClick={() => removeFromWishlist(id)} />
        )}
        {cardType && (
          <StyledAddCartIcon onClick={() => toggleModalProduct(id)} />
        )}
      </OuterImageWrapper>
      <DescriptionWrapper>
        <ProductTitle>{name}</ProductTitle>
        <Price>{price} €</Price>
      </DescriptionWrapper>
    </ProductWrapper>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  pictureURL: PropTypes.string,
  handleWishlist: PropTypes.func,
  onWishlist: PropTypes.bool,
  cardType: PropTypes.oneOf(['productCard', 'wishedCard', '']),
  removeFromWishlist: PropTypes.func,
};

ProductCard.defaultProps = {
  className: '',
  id: '',
  name: '',
  price: 0,
  pictureURL: '',
  handleWishlist: () => {},
  removeFromWishlist: () => {},
  onWishlist: false,
  cardType: '',
};

export default ProductCard;
