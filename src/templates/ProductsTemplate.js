import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: auto;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ProductsTemplate = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

ProductsTemplate.propTypes = {
  children: PropTypes.node,
}

ProductsTemplate.defaultProps = {
  children: [],
}

export default ProductsTemplate
