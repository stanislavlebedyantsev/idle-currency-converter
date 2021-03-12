import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  listSection: {
    backgroundColor: 'inherit',
  },
}));

const MapPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [textFieldState, setTextFieldState] = useState('');
  const countryList = useSelector((state) => state.map.countryList);
  const matchedValues = useSelector((state) => state.map.matchedValues);

  const handleSearchResult = (event) => {
    setTextFieldState('');
    dispatch(requestForCountryData(event.target.textContent));
    const filtredList = filterBeforeSave(countryList, '');
    dispatch(updateMatchesValuesListData(filtredList));
  };
  const handleTextFieldChange = (event) => {
    setTextFieldState(event.target.value);
    const filtredList = filterBeforeSave(countryList, event.target.value);
    dispatch(updateMatchesValuesListData(filtredList));
  };

  const listFilter = (list) => {
    return list.map((el) => (
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
          <MapBlock>
            <ListAutocomplete
              classes={classes}
              textFieldState={textFieldState}
              listFilter={listFilter}
              handleTextFieldChange={handleTextFieldChange}
              handleSearchResult={handleSearchResult}
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
