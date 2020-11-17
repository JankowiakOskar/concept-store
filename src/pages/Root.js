import React from 'react'
import styled from 'styled-components'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { ReactComponent as Logo } from 'assets/svgs/Logo.svg'

const FavoriteIcon = styled(FavoriteBorderIcon)`
  color: blue;
`

const Root = () => {
  return (
    <div className="App">
      <Logo />
      <FavoriteIcon />
    </div>
  )
}

export default Root
