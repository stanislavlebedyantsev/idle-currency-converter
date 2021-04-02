import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { COLOR_WHITE } from '@/theme/colors';

export const InputContainer = styled.div.attrs((props) => ({ ...props }))`
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 15em;

  background-color: ${COLOR_WHITE};
  width: 100%;
  padding: 0 0 30px;
  border-radius: 10px;
`;

export const CurrField = styled.div.attrs((props) => ({ ...props }))`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CurrencyName = styled.div`
  width: 15em;
  font-size: 16px;
	display:flex;
  align-items: center;
  margin: 0;
	margin-left: 30px;
	p{
		margin: 0;
		font-size: 18px;
	}
	@media(max-width: 720px){
		flex-direction: column;
		text-align: center
	}
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const ToolsArea = styled.div`
  margin: 2%;
  display: flex;
  width: fit-content;
`;

export const UpdateButton = styled(Button).attrs((props) => ({ ...props }))`
  @media (max-width: 720px) {
    font-size: 1em;
  }
  @media (max-width: 520px) {
    font-size: 12px;
  }
`;
