import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const MainTitle = styled.h1`
  margin: 1% 0 0 0;
  @media (max-width: 720px) {
    font-size: 5vw;
  }
`;
export const SecondTitle = styled.p`
  margin: 0;
	text-align: center;
	font-size: 1vw;
  @media (max-width: 720px) {
    font-size: 4vw;
  }
`;
