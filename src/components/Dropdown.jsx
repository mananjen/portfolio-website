import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownToggle = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  padding: 10px 14px;
  border-radius: 4px;
  color: #333;
  /* Slight shadow around the toggle button */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  /* Down caret icon */
  &:after {
    content: '';
    display: inline-block;
    margin-left: 8px;
    vertical-align: middle;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  transform: scaleY(${(props) => (props.isOpen ? '1' : '0')});
  transform-origin: top;
  opacity: ${(props) => (props.isOpen ? '1' : '0')};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: transform 0.3s ease, opacity 0.3s ease;
  background-color: #fff;
  /* More pronounced shadow around the dropdown */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-radius: 4px;
`;

const DropdownList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const DropdownItem = styled.li`
  a {
    display: block;
    padding: 10px 14px;
    text-decoration: none;
    color: #333;
    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownToggle onClick={() => setIsOpen(!isOpen)}>
        {title}
      </DropdownToggle>
      <DropdownMenu isOpen={isOpen}>
        <DropdownList>
          {items.map((item, index) => (
            <DropdownItem key={index}>
              <a href={item.href}>{item.label}</a>
            </DropdownItem>
          ))}
        </DropdownList>
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;