import React from 'react'
// import { StoreContext } from 'store/StoreProvider'
import styled from 'styled-components'
import PageHeader from 'components/atoms/PageHeader/PageHeader'
import WishListTemplate from 'templates/WhisListTemplate'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100vh;
`

const WishListPage = () => {
  return (
    <Wrapper>
      <PageHeader title="Wishlist" />
      <WishListTemplate />
    </Wrapper>
  )
}

export default WishListPage
