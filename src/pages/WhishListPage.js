import React, { useContext } from 'react'
import { StoreContext } from 'store/StoreProvider'
import styled from 'styled-components'
import PageHeader from 'components/atoms/PageHeader/PageHeader'
import WhishListTemplate from 'templates/WhisListTemplate'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100vh;
`

const WhishListPage = () => {
  const data = useContext(StoreContext)

  console.log(data)
  return (
    <Wrapper>
      <PageHeader title="Whishlist" />
      <WhishListTemplate />
    </Wrapper>
  )
}

export default WhishListPage
