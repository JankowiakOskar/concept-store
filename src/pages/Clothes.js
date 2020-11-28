import React, { useContext } from 'react'
import styled from 'styled-components'
import { StoreContext } from 'store/StoreProvider'
import { getFromArrByID } from 'helpers'
import ProductsTemplate from 'templates/ProductsTemplate'
import ProductCard from 'components/molecules/ProductCard/ProductCard'

const Wrapper = styled.div`
  width: 100%;
  height: auto;
`

const Clothes = () => {
  const {
    data: { products: productsObj, wishlist },
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext)

  const allProductsArr = Object.keys(productsObj).reduce(
    (arr, currentCategory) => {
      const isArrayCategory = Array.isArray(productsObj[currentCategory])
      if (isArrayCategory) arr.push(...productsObj[currentCategory])
      return arr
    },
    [],
  )

  const handleWishlist = (id) => {
    const choosenProduct = getFromArrByID(allProductsArr, id)
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
        {allProductsArr.length &&
          allProductsArr.map(({ id, name, price, picture: { url } }) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              price={price}
              pictureURL={url}
              handleWishlist={handleWishlist}
            />
          ))}
      </ProductsTemplate>
    </Wrapper>
  )
}

export default Clothes
