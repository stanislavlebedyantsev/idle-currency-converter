import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/rootStateTypes';
import MapHeader from '@/components/common/componentsHeader/';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { filterBeforeSave } from '@/utils/';
import {
  requestForCountryData,
  updateMatchesValuesListData,
  requestCountryList,
} from '@/actions/';
import Error from '@/components/common/error/';
import MapContent from '@/components/mapComponents/MapContent';
import BasicLayout from '@/components/layouts/BasicLayout/index';
import ListAutocomplete from '@/components/controls/ListAutocomplete/component';
import {
  Container,
  ContentContainer,
} from '@/components/common/commonStyles/styles';
import { makeStyles } from '@material-ui/core/styles';
import { MapBlock } from './styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '80%',
  },
}));

const MapPage: React.FunctionComponent = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [textFieldState, setTextFieldState] = useState<string>('');
  const countryList = useSelector((state: IRootState) => state.map.countryList);
  const matchedValues = useSelector(
    (state: IRootState) => state.map.matchedValues
  );

  const handleSearchResult = (event: React.MouseEvent<HTMLDivElement>) => {
    setTextFieldState(''); 
    dispatch(requestForCountryData((event.target as HTMLElement).innerText));
    const filtredList = filterBeforeSave(countryList, '');
    dispatch(updateMatchesValuesListData(filtredList));
  };
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTextFieldState(event.target.value);
    const filtredList = filterBeforeSave(countryList, event.target.value);
    dispatch(updateMatchesValuesListData(filtredList));
  };

  const listFilter = (list: string[]) => {
    return list.map((el: string) => (
      <ListItem button key={el} onClick={handleSearchResult}>
        <ListItemText primary={el} />
      </ListItem>
    ));
  };

  useEffect(() => {
    dispatch(requestCountryList());
  }, [dispatch]);

  return (
    <BasicLayout>
      <Container>
        <Error />
        <ContentContainer>
          <MapHeader
            title="Welcome to map page"
            discription="Here you can write the name of the country you want to receive information about. To get information about the selected country, move the mouse over the marker on the map."
          />
          <MapBlock>
            <ListAutocomplete<typeof classes.root>
              classes={classes.root}
              textFieldState={textFieldState}
              listFilter={listFilter}
              handleTextFieldChange={handleTextFieldChange}
              matchedValues={matchedValues}
              countryList={countryList}
            />
            <MapContent />
          </MapBlock>
        </ContentContainer>
      </Container>
    </BasicLayout>
  );
};

export default MapPage;
