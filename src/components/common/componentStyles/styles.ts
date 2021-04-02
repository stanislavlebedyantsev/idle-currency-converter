import styled from 'styled-components';
import {COLOR_GREY } from '@/theme/colors';
export const Container = styled.div`
  display: block;
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
`;
export const ContentContainer = styled.div.attrs((props) => ({ ...props }))`
  position: absolute;
  min-width: 50%;
	max-width: 90%;
  border-radius: 16px;
  @media (max-width: 823px) and (max-height: 512px) {
    top: 30%;
  }
  @media (min-width: 720px) and (height: 540px) {
    top: 20%;
  }
`;
