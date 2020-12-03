import React, { useContext, useEffect, useRef } from 'react'
import { StoreContext } from 'store/StoreProvider'
import { useParams } from 'react-router-dom'
import { getFromArrByID, setItemToLocalStorage } from 'helpers'
import DetailProductTemplate from 'templates/DetailProductTemplate'
import LoadingProvider from 'providers/LoadingProvider'
import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 120px 0;
`

const DetailPage = () => {
  const {
    data: { products },
  } = useContext(StoreContext)
  const storedProductRef = useRef(null)
  const { id } = useParams()
  const choosenProduct = getFromArrByID(products, id)

  if (!choosenProduct) {
    const [storedProduct] = JSON.parse(localStorage.getItem('choosenProduct'))
    storedProductRef.current = storedProduct
  }

  useEffect(() => {
    if (choosenProduct) setItemToLocalStorage('choosenProduct', choosenProduct)

    return () => localStorage.removeItem('choosenProduct')
  }, [choosenProduct])

  return (
    <LoadingProvider>
      <Wrapper>
        <DetailProductTemplate
          product={choosenProduct || storedProductRef.current}
        />
      </Wrapper>
    </LoadingProvider>
  )
}

export default DetailPage
