// src/components/TechPillList.jsx
import styled from 'styled-components';

/**
 * Displays an array of technologies as highlight-colored pill chips.
 * Usage: <TechPillList items={['React','Firebase']} />
 */
const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;

  li {
    background: ${({ theme }) => theme.colors.highlight};
    color: ${({ theme }) => theme.colors.primary};
    padding: 0.35rem 0.9rem;
    border-radius: 9999px;
    font-size: 0.85rem;
    white-space: nowrap;
  }
`;

const TechPillList = ({ items = [] }) => (
  <List>
    {items.map((t, i) => (
      <li key={i}>{t}</li>
    ))}
  </List>
);

export default TechPillList;