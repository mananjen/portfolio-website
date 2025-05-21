// src/components/ExpandableSection.jsx
import styled from 'styled-components';
import { device } from '../constants/screenSizes';

/**
 * A wrapper that smoothly expands / collapses via “open” prop.
 * Optionally flips its flex-direction on desktop via “flip” prop.
 */
const ExpandableSection = styled.div`
  overflow: hidden;
  max-height: ${({ open }) => (open ? '2000px' : '0')};
  opacity: ${({ open }) => (open ? 1 : 0)};
  margin-top: ${({ open }) => (open ? '0.2rem' : '0')};
  transition:
    max-height 0.4s ease,
    opacity    0.4s ease,
    margin-top 0.4s ease;

  @media ${device.desktop} {
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    flex-direction: ${({ flip }) => (flip ? 'row-reverse' : 'row')};
  }
`;

export default ExpandableSection;