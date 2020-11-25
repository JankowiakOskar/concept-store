import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  list-style: none;
`

const StyledLink = styled(Link)`
  padding: 25px 20px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
  font-size: 15px;
  text-decoration: none;
  color: ${({ theme }) => theme.grey100};
`

const ListElement = styled.li``

const MenuList = ({ list, handleClosePanel }) => {
  return (
    <List onClick={handleClosePanel}>
      {list.map(({ name, link }) => (
        <StyledLink to={link}>
          <ListElement>{name}</ListElement>
        </StyledLink>
      ))}
    </List>
  )
}

MenuList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  handleClosePanel: PropTypes.func.isRequired,
}

MenuList.defaultProps = {
  list: [],
}

export default MenuList
