import React, { useContext } from 'react'
import { StoreContext } from 'store/StoreProvider'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/atoms/Button/Button'
import Loader from 'react-loader-spinner'

const Wrapper = styled.div`
  height: auto;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.grey100};
  margin: 0 0 50px 0;
`

const ProductsTemplate = ({ children }) => {
  const {
    data: { isLoadingProducts },
    fetchProducts,
  } = useContext(StoreContext)

  return (
    <Wrapper>
      {children}
      <StyledButton onClick={() => fetchProducts()}>
        {isLoadingProducts ? (
          <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
        ) : (
          'Load more'
        )}
      </StyledButton>
    </Wrapper>
  )
}

ProductsTemplate.propTypes = {
  children: PropTypes.node,
}

ProductsTemplate.defaultProps = {
  children: [],
}

export default ProductsTemplate
