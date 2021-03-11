import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectСheckboxChart,
  selectCheckboxChart,
  changeDispayCharsData,
} from '@/actions/';
import FormGroup from '@material-ui/core/FormGroup';
import { predisplayedChartsMapper } from '@/utils/';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@/components/controls/Autocomplite';
import { makeStyles } from '@material-ui/styles';
import { ChartToolArea } from '@/components/chartsComponents/styles';

const useStyles = makeStyles({
  autocomplete: {
    width: '25%',
  },
  input: {
    maxWidth: '30%',
    marginLeft: '10%',
  },
});

const ChartTopToolArea = () => {
  const selectedCurrencies = useSelector(
    (store) => store.charts.selectedCheckboxesCurrencies
  );
  const allCurrencys = useSelector((store) => store.converter.allCurrs);
  const chartsRatesHistory = useSelector((store) => store.charts.ratesHistory);
  const localCurrency = useSelector(
    (store) => store.converter.localCurrency
  );
  const [choisenCurr, setChoisenCurr] = useState('');
  const [checkboxState, setCheckboxState] = useState({
    USD: selectedCurrencies.includes('USD'),
    BYN: selectedCurrencies.includes('BYN'),
    RUB: selectedCurrencies.includes('RUB'),
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setChoisenCurr(() => localCurrency.code);
  }, [localCurrency]);

  const handleSelectMainCurrency = (event, newValue) => {
    const mappedDisplayCurrency = predisplayedChartsMapper(newValue, chartsRatesHistory);
    setChoisenCurr(newValue);
    dispatch(changeDispayCharsData(mappedDisplayCurrency));
  };
  const handleChangeCheckbox = (event) => {
    setCheckboxState(() => ({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    }));
    if (event.target.checked) {
      dispatch(selectCheckboxChart(event.target.name));
    } else {
      dispatch(removeSelectСheckboxChart(event.target.name));
    }
  };

  return (
    <ChartToolArea>
      <Autocomplete
        styles={classes.autocomplete}
        options={[...allCurrencys]}
        defValue={choisenCurr || "error"}
        onChange={handleSelectMainCurrency}
      />
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              name="USD"
              color="primary"
              onChange={handleChangeCheckbox}
              checked={checkboxState['USD']}
            />
          }
          label="USD"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="BYN"
              checked={checkboxState['BYN']}
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
              checked={checkboxState['RUB']}
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
