import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import baseIconStyle from 'components/atoms/ExternalIcon/ExternalIcon'
import useOutsideClick from 'hooks/useOutsideClick'
import { arrObjectsFromObjectPairs } from 'helpers'

const DropDownWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DropDownHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.grey100};
  border-radius: 10px;
  border: 1px solid
    ${({ theme, isCollapse }) =>
      isCollapse ? theme.primaryLight : theme.grey100};
  box-shadow: 0px 2px 5px -1px rgba(0, 0, 0, 0.75);
  cursor: pointer;
`

const DropDownTitle = styled.span`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  flex-basis: 85%;
  margin: 10px 0 10px 10px;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.grey100};
  border-right: 1px solid ${({ theme }) => theme.grey200};
`

const ArrowIcon = styled(KeyboardArrowDownIcon)`
  flex-basis: 15%;
  ${baseIconStyle}
  transition: transform 0.15s ease !important;
  transform: ${({ isCollapse }) =>
    isCollapse ? 'rotate(180deg)' : 'rotate(0)'};
`

const DropDownList = styled(motion.ul)`
  position: absolute;
  top: 50px;
  left: 0;
  margin: 20px 0 0 0;
  list-style: none;
  width: 100%;
  border-radius: 10px;
  transform-origin: top center;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.grey200};
  box-shadow: 0px 2px 7px -1px rgba(0, 0, 0, 0.75);
  z-index: ${({ theme }) => theme.zIndex.level7};
`

const DropDownElement = styled.li`
  padding: 10px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.grey300};
  transform: all 0.15s ease;
  cursor: pointer;
  ${({ theme }) => theme.mq.desktop} {
    &:hover {
      background-color: ${({ theme }) => theme.grey200};
      color: ${({ theme }) => theme.white};
      border-radius: 10px;
    }
  }
  &:last-child {
    border: none;
  }
`

const Dropdown = () => {
  const [isCollapse, setCollapse] = useState(false)
  const [value, setValue] = useState('')
  const DropDownWrapperRef = useRef(null)

  const sizes = { l: '6', m: '8', s: '12', xl: '13', xs: '10' }

  const newSizes = arrObjectsFromObjectPairs(sizes, 'size', 'amount')

  console.log(newSizes)

  const handleOpening = () => {
    setCollapse(!isCollapse)
  }

  useOutsideClick(DropDownWrapperRef, () => setCollapse(false))

  const handleClick = (e) => {
    const choosenSize = e.target.innerText
    setValue(choosenSize)
  }

  const listVariants = {
    hidden: {
      opacity: 0,
    },
    vissible: {
      opacity: [0, 0.5, 1],
      scaleY: [0, 1],
      transition: {
        type: 'easeOut',
        duration: 0.25,
      },
    },
    exit: {
      opacity: [1, 0.5, 0],
      scaleY: [1, 0],
      transition: {
        type: 'easeIn',
        duration: 0.15,
      },
    },
  }

  return (
    <DropDownWrapper ref={DropDownWrapperRef} onClick={handleOpening}>
      <DropDownHeader isCollapse={isCollapse}>
        <DropDownTitle>{value || 'Choose size'}</DropDownTitle>
        <ArrowIcon isCollapse={isCollapse} />
      </DropDownHeader>
      <AnimatePresence>
        {isCollapse && (
          <DropDownList
            variants={listVariants}
            initial="hidden"
            animate="vissible"
            exit="exit"
            onClick={(e) => handleClick(e)}
          >
            <DropDownElement>XS</DropDownElement>
            <DropDownElement>S</DropDownElement>
            <DropDownElement>M</DropDownElement>
            <DropDownElement>L</DropDownElement>
            <DropDownElement>XL</DropDownElement>
          </DropDownList>
        )}
      </AnimatePresence>
    </DropDownWrapper>
  )
}

export default Dropdown
