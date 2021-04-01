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
    font-size: 2.5vw;
  }
  @media (min-width: 720px) {
    font-size: 1.5vw;
  }
`;
export const SecondTitle = styled.p`
  margin: 0;
	text-align: center;
	
	@media (max-width: 720px) {
    font-size: 2vw;
  }
  @media (min-width: 720px) {
    font-size: 1vw;
  }
`;
