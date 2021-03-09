import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { filterBeforeSave } from "@utils/map/index";
import { requestForCountryData, updateMatchesListData } from "@actions/index";
import Error from "@components/common/error/component";
import MapContent from "./MapContent/component";
import ListAutocomplete from "@components/controls/ListAutocomplete/component";
import { requestCountryList } from "@actions/index";
import {
  Container,
  ContentContainer,
} from "@components/common/commonStyles/styles";
import { makeStyles } from "@material-ui/core/styles";
import { MapBlock } from "./styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "80%",
  },
  listSection: {
    backgroundColor: "inherit",
  },
}));

const MapLanding = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [textFieldState, setTextFieldState] = useState("");
  const countryList = useSelector((state) => state.map.countryList);
  const matchedValues = useSelector((state) => state.map.matchedValues);

  const handleSearchResult = (event) => {
    setTextFieldState("");
    dispatch(requestForCountryData(event.target.textContent));
    const filtredList = filterBeforeSave(countryList, "");
    dispatch(updateMatchesListData(filtredList));
  };
  const handleTextFieldChange = (event) => {
    setTextFieldState(event.target.value);
    const filtredList = filterBeforeSave(countryList, event.target.value);
    dispatch(updateMatchesListData(filtredList));
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
  );
};

export default MapLanding;
