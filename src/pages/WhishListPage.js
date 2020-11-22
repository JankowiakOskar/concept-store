import React from 'react'
import styled from 'styled-components'
import PageHeader from 'components/atoms/PageHeader/PageHeader'

const Wrapper = styled.div`
  padding: 80px 0 0 0;
  width: 100%;
  min-height: 100vh;
`

const WhishListPage = () => {
  return (
    <Wrapper>
      <PageHeader title="Whishlist" />
    </Wrapper>
  )
}

export default WhishListPage
