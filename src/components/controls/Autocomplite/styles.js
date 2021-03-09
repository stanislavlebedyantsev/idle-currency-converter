import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import MaterialAutocomplete from "@material-ui/lab/Autocomplete";

export const Autocomplete = styled(MaterialAutocomplete).attrs((props) => ({
  ...props,
}))`
  margin-top: 1%;
  margin-right: 10%;
  display: inline-block;
`;

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
