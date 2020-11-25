import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import denimJacket from 'assets/images/denimJacket.jpg'
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

const ImageWrapper = styled.div`
  height: 400px;
  position: relative;
  width: 100%;
  overflow: hidden;
`

const ProductImage = styled(motion.img)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 5;
`

const StyledFavoriteIcon = styled(FavoriteBorderIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  fill: ${({ favorite, theme }) =>
    favorite ? `${theme.red} !important` : `${theme.grey100} !important`};
  ${baseIconStyle};
  transition: isFavorite 0.15s ease;
  cursor: pointer;
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

const ProductCard = () => {
  const [isFavorite, setFavorite] = useState(false)
  return (
    <ProductWrapper>
      <ImageWrapper>
        <ProductImage src={denimJacket} whileHover={{ scale: 1.1 }} />
        <StyledFavoriteIcon
          favorite={isFavorite}
          onClick={() => setFavorite(!isFavorite)}
        />
      </ImageWrapper>
      <DescriptionWrapper>
        <ProductTitle>Denim jacket</ProductTitle>
        <Price>30,99 €</Price>
      </DescriptionWrapper>
    </ProductWrapper>
  )
}

export default ProductCard
