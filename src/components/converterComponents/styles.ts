import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const InputContainer = styled.div.attrs((props) => ({ ...props }))`
  margin: 7.2% 0 0 20px;
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 50vh;
`;

export const CurrField = styled.div.attrs((props) => ({ ...props }))`
  $grid__bp--md: 50%;
  $grid__cols: 50;
  max-width: $grid__bp--md * 1%;
  margin-bottom: 2%;
`;

export const ToolsArea = styled.div`
  grid-column: 2;
  margin: 2% 2% 4%;
  width: 50%;
  grid-row: 1;
`;

export const UpdateButton = styled(Button).attrs((props) => ({ ...props }))`
	@media(max-width:720px){
		font-size: 2vw;
	}
	@media(max-width:520px){
		font-size: 3vw;
	}
`;
