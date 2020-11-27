import React, { useContext } from 'react'
import { StoreContext } from 'store/StoreProvider'
import styled from 'styled-components'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import { getFromArrByID } from 'helpers'

const Wrapper = styled.div`
  height: auto;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProductsTemplate = () => {
  const {
    data: { products: productsObj },
    addToWishlist,
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
    addToWishlist(choosenProduct)
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export default ProductsTemplate
