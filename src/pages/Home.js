import React, { useContext } from 'react'
import { AppContext } from 'store/StoreProvider'
import styled from 'styled-components'
import Slider from 'components/organisms/Slider/Slider'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100%;
`

const Home = () => {
  const { slides } = useContext(AppContext)
  return (
    <Wrapper>
      <Slider slides={slides} />
    </Wrapper>
  )
}

export default Home
