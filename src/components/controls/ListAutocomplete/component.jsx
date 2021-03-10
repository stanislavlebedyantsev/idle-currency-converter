import { React } from 'react';
import List from '@material-ui/core/List';
import InputControl from '@/components/controls/Input/component';
import { AutoCompleteListContainer } from './styles';

const ListAutocomplete = ({
  textFieldState,
  handleTextFieldChange,
  classes,
  matchedValues,
  countryList,
  listFilter,
}) => {
  return (
    <AutoCompleteListContainer>
      <InputControl
        id="standard-basic"
        label="Type currency"
        value={textFieldState}
        onChange={handleTextFieldChange}/>
      <List className={classes.root}>
        {matchedValues.length
          ? listFilter(matchedValues)
          : listFilter(countryList)}
      </List>
    </AutoCompleteListContainer>
  );
};

export default ListAutocomplete;
