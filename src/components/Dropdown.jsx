// src/components/Dropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import CustomLink from './CustomLink';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 20px;
  height: 20px;

  & span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: ${props => props.theme.colors.text};
    border-radius: 2px;
    transition: background-color 0.3s ease;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: max-content;
  min-width: 200px;
  transform: scaleY(${props => (props.isOpen ? '1' : '0')});
  transform-origin: top;
  opacity: ${props => (props.isOpen ? '1' : '0')};
  pointer-events: ${props => (props.isOpen ? 'auto' : 'none')};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background-color: #fff;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 4px;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DropdownItem = styled.li``;

const StyledLink = styled(CustomLink)`
  display: block;
  padding: 10px 14px;
  color: ${props => props.theme.colors.text};
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease, background-color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.highlight};
    background-color: #f1f1f1;
  }
`;

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown after clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
        <HamburgerIcon>
          <span />
          <span />
          <span />
        </HamburgerIcon>
      </DropdownToggle>
      <DropdownMenu isOpen={isOpen}>
        <DropdownList>
          {items.map((item, index) => (
            <DropdownItem key={index}>
              <StyledLink to={item.href} onClick={handleLinkClick}>
                {item.label}
              </StyledLink>
            </DropdownItem>
          ))}
        </DropdownList>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;