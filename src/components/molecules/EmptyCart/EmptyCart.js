import React, { useContext } from 'react'
import { UIContext } from 'contexts/GlobalUIContext'
import routes from 'routes'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ReactComponent as EmptyBasket } from 'assets/svgs/EmptyBasket.svg'
import { ReactComponent as WhishDraw } from 'assets/svgs/WhishDraw.svg'
import Button from 'components/atoms/Button/Button'

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const EmptyBasketDraw = styled(EmptyBasket)`
  width: 100%;
  height: 200px;
`
const EmptyWhishList = styled(WhishDraw)`
  width: 100%;
  height: 200px;
`

const ContentWrapper = styled.div`
  margin: 20px 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const ContentTitle = styled.h3`
  font-size: ${({ theme }) => theme.medium};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.grey100};
`

const ContentParagraph = styled.p`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.small};
  font-weight: ${({ theme }) => theme.font.weight.regular};
  color: ${({ theme }) => theme.grey100};
`

const StyledButton = styled(Button)`
  margin-top: 20px;
  width: 200px;
  color: ${({ theme }) => theme.grey400};
`

const EmptyCard = ({ title, description, type }) => {
  const { closeSidePanel } = useContext(UIContext)

  return (
    <Wrapper>
      {type === 'shopingBasket' && <EmptyBasketDraw />}
      {type === 'whishList' && <EmptyWhishList />}
      <ContentWrapper>
        <ContentTitle>{title}</ContentTitle>
        <ContentParagraph>{description}</ContentParagraph>
        {type === 'shopingBasket' && (
          <Link to={routes.clothes} onClick={closeSidePanel}>
            <StyledButton primary>Continue shopping</StyledButton>
          </Link>
        )}
      </ContentWrapper>
    </Wrapper>
  )
}

EmptyCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['shopingBasket', 'whishList']).isRequired,
}

export default EmptyCard
