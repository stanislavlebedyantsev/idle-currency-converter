import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import { filterBeforeSave } from "@utils/map/index";
import { requestForCountryData, updateMatchesListData } from "@actions/index";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "80%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
}));

const MapAutocomplete = () => {
  const [textFieldState, setTextFieldState] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
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
  return (
    <div>
      <TextField
        id="standard-basic"
        label="Type currency"
        value={textFieldState}
        onChange={handleTextFieldChange}
      />
      <List className={classes.root}>
        {matchedValues.length
          ? listFilter(matchedValues)
          : listFilter(countryList)}
      </List>
    </div>
  );
};

export default MapAutocomplete;
