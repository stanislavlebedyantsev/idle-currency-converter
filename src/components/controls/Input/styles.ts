import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField).attrs((props) => ({ ...props }))`
  @media (max-width: 568px) {
    input {
      font-size: 4vw;
    }
    label {
      font-size: 4vw;
    }
  }
`;
