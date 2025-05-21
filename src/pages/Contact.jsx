// src/pages/Contact.jsx
import React from 'react';
import styled from 'styled-components';
import { device } from '../constants/screenSizes';
import CustomLink from '../components/CustomLink';
import { 
    FaEnvelope, 
    FaLinkedin, 
    FaGithub, 
    FaPhone, 
    FaWhatsapp 
} from 'react-icons/fa';
import PageContainer from '../components/PageContainer';

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ContactItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  font-size: 1.1rem;
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-direction: column;
    gap: 0.3rem;
    font-size: 1rem;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const Contact = () => {
  return (
    <PageContainer padM="2rem" padD="3rem" center>
      <Title>Feel free to reach out via any of the following methods:</Title>
      <ContactList>
        <ContactItem>
          <IconWrapper><FaEnvelope /></IconWrapper>
          <CustomLink to="mailto:mananjen@gmail.com">mananjen@gmail.com</CustomLink>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaLinkedin /></IconWrapper>
          <CustomLink to="https://www.linkedin.com/in/mananjen/" target="_blank">mananjen</CustomLink>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaGithub /></IconWrapper>
          <CustomLink to="https://github.com/mananjen" target="_blank">mananjen</CustomLink>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaPhone /></IconWrapper>
          <CustomLink to="tel:+1-872-202-0800">+1 (872) 202-0800</CustomLink>
        </ContactItem>
        <ContactItem>
          <IconWrapper><FaWhatsapp /></IconWrapper>
          <CustomLink to="https://wa.me/18722020800">Chat on Whatsapp</CustomLink>
        </ContactItem>
      </ContactList>
    </PageContainer>
  );
};

export default Contact;