import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export const Input = styled(TextField).attrs((props) => ({ ...props }))`
  @media (min-width: 720px) {
    input {
      font-size: 1.5vw;
    }
  }
  @media (max-width: 719px) {
    input {
      font-size: 4vw;
    }
  }
`;