import styled from 'styled-components';
import MaterialAutocomplete from '@material-ui/lab/Autocomplete';

export const Autocomplete = styled(MaterialAutocomplete).attrs((props) => ({
  ...props,
}))`
  margin-top: 1%;
  margin-bottom: 1%;
  margin-right: 10%;
  display: inline-block;
`;


