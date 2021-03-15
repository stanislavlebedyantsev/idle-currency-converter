import styled from 'styled-components';
import background from '@/assets/background.jpg';

export const Container = styled.div`
  display: block;
  position: fixed;
  left: 0;
  top: 0;
  z-index: -10;
  background: url(${background}) no-repeat center center;
  background-size: cover;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
	overflow-y: auto;
`;
export const ContentContainer = styled.div.attrs((props) => ({ ...props }))`
  position: absolute;

  min-width: 50%;
  max-height: 100vh;
  border-radius: 16px;
  background-color: #fff;
  @media (max-width: 568px) and (max-height: 320px) {
		margin-top: 50vh;
    max-height: 150vh;
  }
`;
