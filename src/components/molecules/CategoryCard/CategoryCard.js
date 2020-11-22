import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from 'components/atoms/Button/Button'

const WrapperCard = styled.div`
  margin: 30px 0;
  position: relative;
  width: 100%;
  height: 250px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: linear-gradient(rgba(53, 129, 200, 0.2), rgba(0, 25, 32, 0.3));
  }
`

const CategoryImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`

const StyledButton = styled(Button)`
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const CategoryCard = ({ image, categoryType }) => {
  return (
    <WrapperCard>
      <CategoryImg src={image} />
      <StyledButton secondary>{categoryType}</StyledButton>
    </WrapperCard>
  )
}

CategoryCard.propTypes = {
  image: PropTypes.string.isRequired,
  categoryType: PropTypes.string.isRequired,
}

export default CategoryCard
