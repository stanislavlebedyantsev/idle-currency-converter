import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
export const MainTitle = styled.h1`
  margin: 1% 0 0 0;
  @media (min-width: 720px) {
    font-size: 38px;
  }
  @media (max-width: 568px) {
    font-size: 28px !important;
  }
`;
export const SecondTitle = styled.p`
  margin: 0;
  text-align: center;
  @media (min-width: 720px) {
    font-size: 24px;
  }
  @media (max-width: 568px) {
    font-size: 12px !important;
  }
`;
