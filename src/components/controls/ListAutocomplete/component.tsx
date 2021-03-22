import React from 'react';
import List from '@material-ui/core/List';
import InputControl from '@/components/controls/Input/component';
import { AutoCompleteListContainer } from './styles';
import { useTranslation } from 'react-i18next';

type TProps<T> = {
  textFieldState: string;
  handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classes: T;
  matchedValues: Array<string>;
  countryList: Array<string>;
  listFilter: (list: Array<string>) => Array<React.ReactElement>;
};

const ListAutocomplete = <T extends string>({
  textFieldState,
  handleTextFieldChange,
  classes,
  matchedValues,
  countryList,
  listFilter,
}: TProps<T>): React.ReactElement => {
  const { t } = useTranslation();
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
        label={t('mapsLabel')}
        value={textFieldState}
        onChange={handleTextFieldChange}
      />
      <List className={classes}>{listChild()}</List>
    </AutoCompleteListContainer>
  );
};

export default ListAutocomplete;
