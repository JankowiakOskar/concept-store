import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon'

const ProductWrapper = styled.div`
  max-height: 600px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

const ProductImage = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease;
`

const ImageWrapper = styled.div`
  height: 400px;
  position: relative;
  width: 100%;
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
`

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
`

const DescriptionWrapper = styled.div`
  margin: 10px 0 0 0;
`
const ProductTitle = styled.h3`
  font-size: ${({ theme }) => theme.font.size.medium};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`

const Price = styled.p`
  color: ${({ theme }) => theme.grey100};
`

const ProductCard = ({ id, name, price, pictureURL, handleWishlist }) => {
  const [isFavorite, setFavorite] = useState(false)

  const handleClickFavorite = (ID) => {
    setFavorite(!isFavorite)
    handleWishlist(ID)
  }
  return (
    <ProductWrapper>
      <ImageWrapper>
        <ProductImage src={`http://localhost:1337${pictureURL}`} />
        <StyledFavoriteIcon
          liked={isFavorite ? 1 : 0}
          onClick={() => handleClickFavorite(id)}
        />
      </ImageWrapper>
      <DescriptionWrapper>
        <ProductTitle>{name}</ProductTitle>
        <Price>{price} €</Price>
      </DescriptionWrapper>
    </ProductWrapper>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  pictureURL: PropTypes.string,
  handleWishlist: PropTypes.func,
}

ProductCard.defaultProps = {
  name: '',
  price: 0,
  pictureURL: '',
  handleWishlist: () => {},
}

export default ProductCard
