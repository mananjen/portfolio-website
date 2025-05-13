// src/components/Description.jsx
import styled from 'styled-components';
import { device } from '../constants/screenSizes';

const Description = styled.p`
  width: 100%;
  text-align: justify;  
  font-size: ${({ sizeMobile }) => sizeMobile || '1rem'};
  line-height: ${({ lhMobile })   => lhMobile   || '1.6'};
  margin-bottom: ${({ mbMobile }) => mbMobile   || '1rem'};
  color: ${({ theme, color })     => color      || theme.colors.text};

  @media ${device.desktop} {
    font-size: ${({ sizeDesktop }) => sizeDesktop || '1.2rem'};
    line-height: ${({ lhDesktop }) => lhDesktop   || '1.8'};
    margin-bottom: ${({ mbDesktop }) => mbDesktop || '1.5rem'};
  }
`;

export default Description;