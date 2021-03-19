import React, { useState, useEffect, ChangeEvent } from 'react';
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
import { IRootState } from '@/types/rootStateTypes';

type TCheckboxesState = {
  [key: string]: boolean;
};

const useStyles = makeStyles({
  autocomplete: {
    width: '25%',
  },
  input: {
    maxWidth: '30%',
    marginLeft: '10%',
  },
});

const ChartTopToolArea = (): React.ReactElement => {
  const selectedCurrencies = useSelector(
    (store: IRootState) => store.charts.selectedCheckboxesCurrencies
  );
  const allCurrencys = useSelector(
    (store: IRootState) => store.converter.allCurrs
  );
  const chartsRatesHistory = useSelector(
    (store: IRootState) => store.charts.ratesHistory
  );
  const localCurrency = useSelector(
    (store: IRootState) => store.converter.localCurrency
  );
  const [choisenCurr, setChoisenCurr] = useState<string>('');
  const [checkboxes, setCheckboxes] = useState<Array<string>>([
    'USD',
    'BYN',
    'RUB',
  ]);
  const [checkboxState, setCheckboxState] = useState<TCheckboxesState>({
    USD: selectedCurrencies.includes('USD'),
    BYN: selectedCurrencies.includes('BYN'),
    RUB: selectedCurrencies.includes('RUB'),
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    setChoisenCurr(() => localCurrency.code);
  }, [localCurrency]);
  useEffect(() => {
    const sameCurr = checkboxes?.find((el) => el === choisenCurr);
    if (sameCurr) dispatch(removeSelectСheckboxChart(sameCurr));
    setCheckboxState(() => ({
      USD: selectedCurrencies.includes('USD'),
      BYN: selectedCurrencies.includes('BYN'),
      RUB: selectedCurrencies.includes('RUB'),
    }));
  }, [checkboxes, choisenCurr]);

  const handleSelectMainCurrency = (event: ChangeEvent, newValue: string) => {
    const mappedDisplayCurrency = predisplayedChartsMapper(
      newValue,
      chartsRatesHistory
    );
    setChoisenCurr(newValue);
    dispatch(changeDispayCharsData(mappedDisplayCurrency));
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setCheckboxState(() => ({
      ...checkboxState,
      [target.name]: target.checked,
    }));
    if (target.checked) {
      dispatch(selectCheckboxChart(target.name));
    } else {
      dispatch(removeSelectСheckboxChart(target.name));
    }
  };

  return (
    <ChartToolArea>
      <Autocomplete<typeof classes.autocomplete> 
        styles={classes.autocomplete}
        options={[...allCurrencys]}
        defValue={choisenCurr || 'error'}
        onChange={handleSelectMainCurrency}
        label={undefined}
      />
      <FormGroup row>
        {checkboxes.map((el) =>
          choisenCurr !== el ? (
            <FormControlLabel
              control={
                <Checkbox
                  name={el}
                  color="primary"
                  onChange={handleChangeCheckbox}
                  checked={checkboxState[el]}
                />
              }
              label={el}
            />
          ) : null
        )}
      </FormGroup>
    </ChartToolArea>
  );
};

export default ChartTopToolArea;
