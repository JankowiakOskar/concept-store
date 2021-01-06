import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import partnersBrands from './partnersBrands';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

const PartnerBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PartnerImg = styled.img`
  width: 100%;
  height: 80%;
  object-fit: contain;
`;

const MultiCarousel = () => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      removeArrowOnDeviceType={['mobile', 'desktop', 'tablet']}
    >
      {partnersBrands.map((brand) => (
        <PartnerBox key={brand}>
          <PartnerImg src={brand} />
        </PartnerBox>
      ))}
    </Carousel>
  );
};

export default MultiCarousel;
