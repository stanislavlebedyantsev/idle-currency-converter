import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '@/types/rootStateTypes';
import MapHeader from '@/components/common/componentsHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { filterBeforeSave } from '@/utils';
import {
  requestForCountryData,
  updateMatchesValuesListData,
  requestCountryList,
} from '@/actions/';
import Error from '@/components/common/error/';
import MapContent from '@/components/mapComponents/MapContent';
import BasicLayout from '@/components/layouts/BasicLayout/index';
import ListAutocomplete from '@/components/controls/ListAutocomplete/component';
import { Container, ContentContainer } from '@/theme/styles';
import { makeStyles } from '@material-ui/core/styles';
import { MapBlock } from './styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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

  const listFilter = (list: Array<string>) => {
    return list.map((element: string) => (
      <ListItem button key={element} onClick={handleSearchResult}>
        <ListItemText primary={element} />
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
            title={t('mapsTitle')}
            description={t('mapsDescription')}
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
