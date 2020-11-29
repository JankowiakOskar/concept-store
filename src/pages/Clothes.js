import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { StoreContext } from 'store/StoreProvider'
import { getFromArrByID } from 'helpers'
import ProductsTemplate from 'templates/ProductsTemplate'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import SkeletonCard from 'components/molecules/SkeletonCard/SkeletonCard'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  height: auto;
`
const CardWrapper = styled(motion.div)`
  margin: 20px 0;
`

const cardVariants = {
  hidden: { opacity: 0 },
  vissible: {
    opacity: 1,
    transition: {
      type: 'ease',
      duration: 0.5,
    },
  },
}

const Clothes = () => {
  const {
    data: { products, wishlist },
    addToWishlist,
    removeFromWishlist,
    fetchProducts,
  } = useContext(StoreContext)

  // const allProductsArr = Object.keys(productsObj).reduce(
  //   (arr, currentCategory) => {
  //     const isArrayCategory = Array.isArray(productsObj[currentCategory])
  //     if (isArrayCategory) arr.push(...productsObj[currentCategory])
  //     return arr
  //   },
  //   [],
  // )
  const handleWishlist = (id) => {
    const choosenProduct = getFromArrByID(products, id)
    const isOnWishlist = wishlist.some(
      (product) => product.id === choosenProduct.id,
    )
    return isOnWishlist
      ? removeFromWishlist(choosenProduct)
      : addToWishlist(choosenProduct)
  }
  return (
    <Wrapper>
      <ProductsTemplate>
        {products.length
          ? products.map(({ id, name, price, picture: { url } }) => (
              <CardWrapper
                variants={cardVariants}
                initial="hidden"
                animate="vissible"
                key={id}
              >
                <ProductCard
                  id={id}
                  name={name}
                  price={price}
                  pictureURL={url}
                  handleWishlist={handleWishlist}
                  onWishlist={wishlist.some((product) => product.id === id)}
                  cardType="productCard"
                />
              </CardWrapper>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <CardWrapper key={index}>
                <SkeletonCard />
              </CardWrapper>
            ))}
      </ProductsTemplate>
    </Wrapper>
  )
}

export default Clothes
