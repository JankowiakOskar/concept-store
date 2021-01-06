import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
  },
};

const MultiCarousel = ({ children }) => {
  return (
    <Carousel responsive={responsive} itemClass="carousel-iem-padding-40-px">
      {children}
    </Carousel>
  );
};

MultiCarousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MultiCarousel;
