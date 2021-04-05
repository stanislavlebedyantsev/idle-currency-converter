import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { COLOR_WHITE } from '@/theme/colors';
import { TextField } from '@material-ui/core';

export const InputContainer = styled.div.attrs((props) => ({ ...props }))`
  font-family: Roboto, sans-serif;
  display: flex;
  flex-flow: column;
  overflow: auto;
  max-height: 15em;
  @media (min-width: 720px) {
    max-height: 30em;
  }
  background-color: ${COLOR_WHITE};
  width: 100%;
  padding: 0 0 30px;
  border-radius: 10px;
	box-shadow: 0 0 10px rgba(0,0,0,0.2);
`;

export const CurrField = styled.div.attrs((props) => ({ ...props }))`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  @media (min-width: 720px) {
    margin-left: 30em;
    max-width: 30em;
  }
  .MuiInput-underline:before {
    border-bottom: none !important;
  }
`;

export const InputCurrencieField = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;
`;

export const CurrencyName = styled.div`
  font-weight: 300;
  width: 80%;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-left: 10%;
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

export const CurrencyInput = styled(TextField).attrs((props) => ({ ...props }))`
  label {
    font-weight: 300;
  }
  input {
    font-weight: 300;
  }
  input {
    font-size: 2em;
  }
  label {
    font-size: 1.2em;
  }
`;

export const TimeNow = styled.p`
  margin: 20px 0;
`;
