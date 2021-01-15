import React from 'react';
import useWindowWidth from 'hooks/useWindowWidth';
import styled, { css } from 'styled-components';
import Accordion, {
  AccordionHeader,
  AccordionList,
} from 'components/molecules/Accordion/Accordion';
import { ReactComponent as FaceBookIcon } from 'assets/svgs/FacebookIcon.svg';
import { ReactComponent as InstagramIcon } from 'assets/svgs/InstagramIcon.svg';
import { ReactComponent as YouTubeIcon } from 'assets/svgs/YoutubeIcon.svg';
import { companyLinks, adventagesLinks, helpLinks } from './listLinks';

const IconsWrapper = styled.div`
  margin: 10px 0 0 0;
  text-align: center;
`;

const AccordionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterDescription = styled.div`
  color: ${({ theme }) => theme.primaryLight};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;

  ${({ theme }) => theme.mq.tablet} {
    justify-content: flex-start;
  }
`;

const iconStyle = css`
  fill: ${({ theme }) => theme.grey300};

  margin: 0 10px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    fill: ${({ theme }) => theme.primaryLight};
  }
`;

const StyledFaceBookIcon = styled(FaceBookIcon)`
  ${iconStyle}
`;

const StyledInstagramIcon = styled(InstagramIcon)`
  ${iconStyle}
`;

const StyledYouTubeIcon = styled(YouTubeIcon)`
  ${iconStyle}
`;

const FooterWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
`;

const InnerWrapper = styled.div`
  margin: 0 auto;
  max-width: 1500px;

  ${({ theme }) => theme.mq.tablet} {
    padding: 50px 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    ${IconsWrapper} {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;

      & > * {
        margin: 0 0 10px 0;
      }
    }

    ${AccordionsWrapper} {
      flex-direction: row;
      justify-content: space-between;
      flex-basis: 70%;

      ${AccordionHeader} {
        padding: 0px 50px 20px 0px;
      }

      ${AccordionList} {
        padding: 0px;
      }
    }

    ${FooterDescription} {
      width: 100%;
    }
  }
`;

const Footer = () => {
  const tabletMedia = '(min-width: 767px)';
  const [isMatchedWidth] = useWindowWidth(tabletMedia);
  return (
    <FooterWrapper>
      <InnerWrapper>
        <AccordionsWrapper>
          <Accordion
            isActive={isMatchedWidth}
            title="Our company"
            list={companyLinks}
          />
          <Accordion
            isActive={isMatchedWidth}
            title="Our adventages"
            list={adventagesLinks}
          />
          <Accordion
            isActive={isMatchedWidth}
            title="Help and contact"
            list={helpLinks}
          />
        </AccordionsWrapper>
        <IconsWrapper>
          <StyledFaceBookIcon />
          <StyledInstagramIcon />
          <StyledYouTubeIcon />
        </IconsWrapper>
        <FooterDescription>
          <span>&#169; Concept Store - all rights reserved</span>
        </FooterDescription>
      </InnerWrapper>
    </FooterWrapper>
  );
};

export default Footer;
