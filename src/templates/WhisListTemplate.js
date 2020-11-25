import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import EmptyCard from 'components/molecules/EmptyCart/EmptyCart'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 8px;
  text-align: center;
`

const WhishListTemplate = ({ whishList }) => {
  return (
    <Wrapper>
      {!whishList.length && (
        <EmptyCard
          title="You haven't any clothes on whishlist"
          description="Let's find something with your style"
          type="whishList"
        />
      )}
    </Wrapper>
  )
}

WhishListTemplate.propTypes = {
  whishList: PropTypes.arrayOf(PropTypes.object),
}

WhishListTemplate.defaultProps = {
  whishList: [],
}

export default WhishListTemplate
