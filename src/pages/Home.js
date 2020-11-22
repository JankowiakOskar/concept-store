import React, { useContext } from 'react'
import { StoreContext } from 'store/StoreProvider'
import styled from 'styled-components'
import Slider from 'components/organisms/Slider/Slider'
import CategoriesTemplate from 'templates/CategoriesTemplate'
import CategoryCard from 'components/molecules/CategoryCard/CategoryCard'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100%;
`

const Home = () => {
  const { slides, categories } = useContext(StoreContext)
  return (
    <Wrapper>
      <Slider slides={slides} />
      <CategoriesTemplate>
        {categories.map(({ category, image }) => (
          <CategoryCard key={category} image={image} categoryType={category} />
        ))}
      </CategoriesTemplate>
    </Wrapper>
  )
}

export default Home
