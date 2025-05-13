import styled from 'styled-components';
import { device } from '../constants/screenSizes';

const PageContainer = styled.section`
  ${({ max })  => `max-width: ${max || '1400px'};`}
  ${({ padM }) => `padding: ${padM || '0.5rem 0.5rem'};`}
  margin: auto;

  @media ${device.desktop} {
    ${({ padD }) => `padding: ${padD || '3rem'};`}
  }

  /* optional centered flex layout */
  ${({ center }) =>
    center &&
    `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      @media ${device.desktop} {
        flex-direction: row;
        gap: 3rem;
        align-items: center;
      }
    `}
`;

export default PageContainer;