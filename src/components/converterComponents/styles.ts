import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const InputContainer = styled.div.attrs((props) => ({ ...props }))`
  margin: 7% 0 0 2%;
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 15em;
	width: 95%;
`;

export const CurrField = styled.div.attrs((props) => ({ ...props }))`
  margin-bottom: 2%;
  display: flex;
  align-items: flex-end;
`;

export const ToolsArea = styled.div`
  grid-column: 2;
  margin: 2% 2% 4%;
  width: 95%;
  grid-row: 1;
`;

export const UpdateButton = styled(Button).attrs((props) => ({ ...props }))`
  @media (max-width: 720px) {
    font-size: 1em;
  }
  @media (max-width: 520px) {
    font-size: 12px;
  }
`;
