import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Slide from 'components/molecules/Slide/Slide'
import ControlDot from 'components/atoms/ControlDot/ControlDot'

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  overflow: hidden;
`

const ControlWrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 50px;
  width: 170px;
  display: flex;
  justify-content: space-between;
`

const Slider = ({ slides }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  const handleClick = (index) => setActiveSlideIndex(index)

  useEffect(() => {
    const slideChanger = (slidesArr, currentSlideIndex) => {
      const numSlides = slidesArr.length
      const isLastSlide = currentSlideIndex === numSlides - 1
      return isLastSlide
        ? setActiveSlideIndex(0)
        : setActiveSlideIndex(activeSlideIndex + 1)
    }
    const interval = setInterval(
      () => slideChanger(slides, activeSlideIndex),
      3600,
    )

    return () => clearInterval(interval)
  }, [activeSlideIndex, slides])

  return (
    <SliderWrapper>
      {slides.map(({ image, title, subTitle, btnContent }, index) => (
        <Slide
          key={title}
          image={image}
          title={title}
          subTitle={subTitle}
          btnContent={btnContent}
          isActiveSlide={activeSlideIndex === index}
        />
      ))}
      <ControlWrapper>
        {slides.map(({ id }, index) => (
          <ControlDot
            isActive={activeSlideIndex === index}
            key={id}
            onClick={() => handleClick(index)}
          />
        ))}
      </ControlWrapper>
    </SliderWrapper>
  )
}

Slider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Slider
