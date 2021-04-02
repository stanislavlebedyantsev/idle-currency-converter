import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField).attrs((props) => ({ ...props }))`
  @media (max-width: 568px) {
    input {
      font-size: 1em;
    }
    label {
      font-size: 1em;
    }
  }
`;
