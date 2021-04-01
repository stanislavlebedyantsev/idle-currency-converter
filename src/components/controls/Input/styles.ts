import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField).attrs((props) => ({ ...props }))`
  @media (min-width: 720px) {
    input {
      font-size: 1.5vw;
    }
  }
  @media (max-width: 719px){
    input {
      font-size: 3.9vw;
    }
    label {
      font-size: 2.5vw;
      width: 80%;
    }
  }
	@media (max-width: 568px) and (max-height: 320px) {
    input {
      font-size: 3vw;
    }
    label {
      font-size: 2.5vw;
      width: 80%;
      right: 0;
      bottom: 0;
    }
  }
	@media (max-width: 320px) and (max-height: 568px) {
    input {
      font-size: 4vw;
    }
    label {
      font-size: 3vw;
      width: 85%;
      right: 0;
      bottom: 0;
    }
  }
`;
