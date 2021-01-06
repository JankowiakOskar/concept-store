import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon';
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
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  ${({ theme }) => theme.mq.desktop} {
    &:hover {
      ${ProductImage} {
        transform: scale(1.1);
      }
    }
  }
`;

const StyledFavoriteIcon = styled(FavoriteBorderIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  fill: ${({ liked, theme }) =>
    liked ? `${theme.red} !important` : `${theme.grey100} !important`};
  ${baseIconStyle};
  transition: isFavorite 0.15s ease;
  cursor: pointer;
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

const StyledDeleteIcon = styled(DeleteForeverIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  fill: ${({ theme }) => theme.grey100};
  ${baseIconStyle}
  z-index: ${({ theme }) => theme.zIndex.level7};
`;

export const DescriptionWrapper = styled.div`
  margin: 10px 0 0 0;
`;
export const ProductTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

export const Price = styled.p`
  color: ${({ theme }) => theme.grey100};
`;

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

  useCallback(() => setFavorite(onWishlist), [onWishlist]);

  const handleClickFavorite = (e, ID) => {
    setFavorite(!isFavorite);
    handleWishlist(ID);
  };

  return (
    <ProductWrapper className={className}>
      <OuterImageWrapper>
        <Link to={`${routes.clothes}/${id}`}>
          <ImageWrapper>
            <ProductImage src={`http://192.168.100.17:8001${pictureURL}`} />
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
  cardType: PropTypes.oneOf(['productCard', 'wishedCard']).isRequired,
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
};

export default ProductCard;
