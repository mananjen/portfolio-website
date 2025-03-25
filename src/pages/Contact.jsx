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

const ContactContainer = styled.section`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
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
  color: ${props => props.theme.colors.highlight};
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Title>Contact Me</Title>
      <Description>
        Feel free to reach out via any of the following methods:
      </Description>
      <ContactList>
        <ContactItem>
          <IconWrapper><FaEnvelope /></IconWrapper>
          <CustomLink to="mailto:mananjen@gmail.com">mananjen@gmail.com</CustomLink>
          <span>or</span>
          <CustomLink to="mailto:mjain35@uic.edu">mjain35@uic.edu</CustomLink>
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
    </ContactContainer>
  );
};

export default Contact;