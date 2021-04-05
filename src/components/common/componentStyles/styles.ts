import styled from 'styled-components';
import { COLOR_GREY } from '@/theme/colors';
export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: -10;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${COLOR_GREY};
  overflow: auto;
`;
export const ContentContainer = styled.div.attrs((props) => ({ ...props }))`
  position: absolute;
  min-width: 80%;
  max-width: 90%;
  border-radius: 16px;
  top: 10%;
  @media (max-height: 414px) {
    top: 15%;
  }
`;
