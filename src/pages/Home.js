import React, { useContext } from 'react'
import { StoreContext } from 'store/StoreProvider'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Slider from 'components/organisms/Slider/Slider'
import CategoriesTemplate from 'templates/CategoriesTemplate'
import CategoryCard from 'components/molecules/CategoryCard/CategoryCard'
import ProductCard from 'components/molecules/ProductCard/ProductCard'
import LoadingProvider from 'providers/LoadingProvider'

const Wrapper = styled(motion.div)`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100%;
`

const Home = () => {
  const { slides, categories } = useContext(StoreContext)
  return (
    <LoadingProvider>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'ease', duration: 0.2 }}
      >
        <Slider slides={slides} />
        <CategoriesTemplate>
          {categories.map(({ category, image }) => (
            <CategoryCard
              key={category}
              image={image}
              categoryType={category}
            />
          ))}
        </CategoriesTemplate>
        <ProductCard />
      </Wrapper>
    </LoadingProvider>
  )
}

export default Home
