import { COLOR_WHITE } from '@/theme/colors';
import styled from 'styled-components';

export const MapBlock = styled.div`
  font-family: Roboto, sans-serif;
  display: flex;
  align-content: space-between;
  flex-wrap: wrap;
  flex-flow: row-reverse;
  height: 30em;
  background-color: ${COLOR_WHITE};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  @media (max-width: 719px) {
    flex-flow: column;
    height: 30em;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
