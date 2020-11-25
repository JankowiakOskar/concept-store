import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart'

const Wrapper = styled.div`
  margin: 80px 0;
  width: 100%;
  height: 100%;
`

const ShoppingCartTemplate = ({ shopingBasket }) => {
  return (
    <Wrapper>
      {!shopingBasket.length && (
        <EmptyCard
          title="Your cart is empty"
          description="I suggest add some clothes"
          type="shopingBasket"
        />
      )}
    </Wrapper>
  )
}

ShoppingCartTemplate.propTypes = {
  shopingBasket: PropTypes.arrayOf(PropTypes.object),
}

ShoppingCartTemplate.defaultProps = {
  shopingBasket: [],
}

export default ShoppingCartTemplate
