import styled from 'styled-components';

export const AutoCompleteListContainer = styled.div`
  width: 25em;
  height: 100%;
  @media (max-width: 720px) {
    width: 100%;
    height: 30%;
    padding-bottom: 24px;
  }
  ul {
    @media (max-height: 320px) {
      height: 50%;
    }
  }
`;
