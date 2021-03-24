import React, { useState } from 'react';
import List from '@material-ui/core/List';
import InputControl from '@/components/controls/Input/component';
import { AutoCompleteListContainer } from './styles';
import { useTranslation } from 'react-i18next';
import ListItem from '@material-ui/core/ListItem';
import { filterBeforeSave } from '@/utils';
import ListItemText from '@material-ui/core/ListItemText';
import { useDispatch } from 'react-redux';
import { updateMatchesValuesListData } from '@/actions';

type TProps<T> = {
  handleSearchResult: (event: React.MouseEvent<HTMLDivElement>) => void;
  classes: T;
  matchedValues: Array<string>;
  countryList: Array<string>;
};

const ListAutocomplete = <T extends string>({
  handleSearchResult,
  classes,
  matchedValues,
  countryList,
}: TProps<T>): React.ReactElement => {
  const [textFieldState, setTextFieldState] = useState<string>('');
  const dispatch = useDispatch();

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldState(event.target.value);
    const filtredList = filterBeforeSave(countryList, event.target.value);
    dispatch(updateMatchesValuesListData(filtredList));
  };

  const listFilter = (list: Array<string>) => {
    return list.map((element: string) => (
      <ListItem button key={element} onClick={handleSearchResult}>
        <ListItemText primary={element} />
      </ListItem>
    ));
  };
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
