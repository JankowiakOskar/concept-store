import React from 'react';
import routes from 'routes';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Button from 'components/atoms/Button/Button';

const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
      rgba(53, 129, 200, 0.3),
      rgba(0, 25, 32, 0.3)
    ),
    url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 70% 40%;
  opacity: 0;
`;

const InnerWrapper = styled(motion.div)`
  width: 100%;
  padding: 0 30px;

  ${({ theme }) => theme.mq.tablet} {
    width: 70%;
    padding: 0 60px;
  }

  ${({ theme }) => theme.mq.desktop} {
    padding: 0 150px;
    max-width: 1700px;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
`;

const SlideTitle = styled.h2`
  font-size: ${({ theme }) => theme.font.size.large};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.white};
  text-shadow: 0 0 4px ${({ theme }) => theme.black};

  ${({ theme }) => theme.mq.tablet} {
    min-width: 600px;
    font-size: ${({ theme }) => theme.font.size.xxl};
  }
`;

const SlideSubTitle = styled.p`
  margin: 5px 0;
  color: ${({ theme }) => theme.grey500};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-shadow: 0 0 2px ${({ theme }) => theme.black};

  ${({ theme }) => theme.mq.tablet} {
    min-width: 600px;
    font-size: ${({ theme }) => theme.font.size.siteHeader};
  }
`;

const StyledButton = styled(Button)`
  margin: 20px 0 0;
  opacity: 0.9;
`;

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      type: 'easeIn',
      when: 'beforeChildren',
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'easeOut',
      duration: 0.2,
    },
  },
};

const childVariants = {
  hidden: {
    x: 50,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'linear',
      duration: 0.3,
    },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: {
      type: 'linear',
      duration: 0.4,
    },
  },
};

const Slide = ({ image, title, subTitle, btnContent, isActiveSlide }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isActiveSlide && (
        <Wrapper
          img={image}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <InnerWrapper variants={childVariants}>
            <SlideTitle>
              {title} <Dot />
            </SlideTitle>
            <SlideSubTitle>{subTitle}</SlideSubTitle>
            <Link to={routes.clothes}>
              <StyledButton>{btnContent}</StyledButton>
            </Link>
          </InnerWrapper>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

Slide.propTypes = {
  image: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  btnContent: PropTypes.string.isRequired,
  isActiveSlide: PropTypes.bool.isRequired,
};

export default Slide;
