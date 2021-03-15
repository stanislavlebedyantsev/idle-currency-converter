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
  const listChild = () => {
    if (matchedValues.length && textFieldState.length) {
      return listFilter(matchedValues);
    } else if (!matchedValues.length && textFieldState.length) {
      return listFilter(matchedValues);
    }
    return listFilter(countryList);
  };

  return (
    <AutoCompleteListContainer>
      <InputControl
        id="standard-basic"
        label="Type country"
        value={textFieldState}
        onChange={handleTextFieldChange}
      />
      <List className={classes.root}>
        {listChild()}
      </List>
    </AutoCompleteListContainer>
  );
};

export default ListAutocomplete;
