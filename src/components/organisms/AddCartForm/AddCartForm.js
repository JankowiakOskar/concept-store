import React from 'react'
import styled from 'styled-components'
import Dropdown from 'components/molecules/Dropdown/Dropdown'
import Button from 'components/atoms/Button/Button'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'

const FormWrapper = styled.div``

const Form = styled.form`
  width: 100%;
`

const ButtonsWrapper = styled.div`
  max-width: 300px;
  margin: 20px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const StyledShopingCartIcon = styled(ShoppingCartIcon)`
  ${baseIconStyle}
  fill: ${({ theme }) => theme.white} !important;
`

const FavoriteIconButton = styled.button`
  width: 50px;
  height: 50px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.grey500};
  border: 2px solid ${({ theme }) => theme.grey100};
  box-shadow: 0px 2px 3px -1px rgba(0, 0, 0, 0.75);
`

const FavoriteIcon = styled(FavoriteBorderIcon)`
  ${baseIconStyle};
`

const AddCartForm = () => {
  return (
    <FormWrapper>
      <Form>
        <Dropdown />
        <ButtonsWrapper>
          <StyledButton primary>
            <StyledShopingCartIcon />
            <span>Add to cart</span>
          </StyledButton>
          <FavoriteIconButton>
            <FavoriteIcon />
          </FavoriteIconButton>
        </ButtonsWrapper>
      </Form>
    </FormWrapper>
  )
}

export default AddCartForm
