import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectChart, selectChart } from "@actions/chartsActionCreators";
import FormGroup from "@material-ui/core/FormGroup";
import { displayedCharts } from "@utils/charts/index";
import { changeDispayCharsData } from "@actions/chartsActionCreators";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@components/controls/Autocomplite";
import { ChartToolArea } from "@components/chartsComponents/chartStyles";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  autocomplete: {
    width: "25%",
  },
  input: {
    maxWidth: "30%",
    marginLeft: "10%",
  },
});

const ChartTopToolArea = () => {
  const selectedCurrency = useSelector(
    (store) => store.charts.selectedCurrency
  );
  const allCurrencys = useSelector((store) => store.converter.allCurrs);
  const chartsRatesHistory = useSelector((store) => store.charts.ratesHistory);
  const localCurrency = useSelector(
    (store) => store.converter.localCurrency.code
  );
  const [choisenCurr, setChoisenCurr] = useState(localCurrency);
  const [checkboxState, setCheckboxState] = useState({
    USD: selectedCurrency.includes("USD"),
    BYN: selectedCurrency.includes("BYN"),
    RUB: selectedCurrency.includes("RUB"),
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleSelectMainCurrency = (event, newValue) => {
    const mappedDisplayCurrency = displayedCharts(newValue, chartsRatesHistory);
    setChoisenCurr(newValue);
    dispatch(changeDispayCharsData(mappedDisplayCurrency));
  };
  const handleChangeCheckbox = (event) => {
    setCheckboxState(() => ({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    }));
    if (event.target.checked) {
      dispatch(selectChart(event.target.name));
    } else {
      dispatch(removeSelectChart(event.target.name));
    }
  };

  return (
    <ChartToolArea>
      <Autocomplete
        styles={classes.autocomplete}
        options={[...allCurrencys]}
        defValue={choisenCurr}
        onChange={handleSelectMainCurrency}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="USD"
              color="primary"
              onChange={handleChangeCheckbox}
              checked={checkboxState["USD"]}
            />
          }
          label="USD"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="BYN"
              checked={checkboxState["BYN"]}
              color="primary"
              onChange={handleChangeCheckbox}
            />
          }
          label="BYN"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="RUB"
              color="primary"
              checked={checkboxState["RUB"]}
              onChange={handleChangeCheckbox}
            />
          }
          label="RUB"
        />
      </FormGroup>
    </ChartToolArea>
  );
};

export default ChartTopToolArea;
