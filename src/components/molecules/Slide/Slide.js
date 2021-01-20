import React from 'react';
import routes from 'routes';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Button, { HoverPrimaryBtn } from 'components/atoms/Button/Button';

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
  padding: 0 20px;
  max-width: 1500px;
  margin: 0 auto;
  width: 100%;

  ${({ theme }) => theme.mq.tablet} {
    padding: 0 800px 0 40px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledButton = styled(Button)`
  margin: 20px 0 0;
  /* opacity: 0.9; */
  ${HoverPrimaryBtn}
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
      duration: 0.4,
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
      type: 'easeIn',
      duration: 0.3,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      type: 'easeOut',
      duration: 0.3,
    },
  },
};

const Slide = ({ image, title, subTitle, btnContent, isActiveSlide }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {isActiveSlide && (
        <Wrapper
          layout
          key={title}
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
            <StyledLink to={routes.clothes}>
              <StyledButton secondary>{btnContent}</StyledButton>
            </StyledLink>
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
