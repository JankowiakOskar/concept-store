import React from 'react';
import styled, { css } from 'styled-components';
import Accordion from 'components/molecules/Accordion/Accordion';
import { ReactComponent as FaceBookIcon } from 'assets/svgs/FacebookIcon.svg';
import { ReactComponent as InstagramIcon } from 'assets/svgs/InstagramIcon.svg';
import { ReactComponent as YouTubeIcon } from 'assets/svgs/YoutubeIcon.svg';
import { companyLinks, adventagesLinks, helpLinks } from './listLinks';

const FooterWrapper = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.black};
`;

const FooterDescription = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  text-align: center;
  padding: 20px 0;
`;

const IconsWrapper = styled.div``;

const iconStyle = css`
  fill: ${({ theme }) => theme.grey300};
  margin: 0 10px;
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

const Footer = () => {
  return (
    <FooterWrapper>
      <Accordion title="Our company" list={companyLinks} />
      <Accordion title="Our adventages" list={adventagesLinks} />
      <Accordion title="Help and contact" list={helpLinks} />
      <FooterDescription>
        <IconsWrapper>
          <StyledFaceBookIcon />
          <StyledInstagramIcon />
          <StyledYouTubeIcon />
        </IconsWrapper>
        <span>&#169; Concept Store - all rights reserved</span>
      </FooterDescription>
    </FooterWrapper>
  );
};

export default Footer;
