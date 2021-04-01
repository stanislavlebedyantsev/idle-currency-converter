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
import { useTranslation } from 'react-i18next';

type TCheckboxesState = {
  [key: string]: boolean;
};

const useStyles = makeStyles({
  autocomplete: {
    width: '27%',
  },
  input: {
    maxWidth: '20%',
    marginLeft: '10%',
  },
});

const ChartTopToolArea = (): React.ReactElement => {
  const { t } = useTranslation();
  const selectedCurrencies = useSelector(
    (store: IRootState) => store.charts.selectedCurrencies
  );
  const allCurrencies = useSelector(
    (store: IRootState) => store.converter.allCurrencies
  );
  const chartsRatesHistory = useSelector(
    (store: IRootState) => store.charts.ratesHistory
  );
  const localCurrency = useSelector(
    (store: IRootState) => store.converter.localCurrency
  );
  const [choisenCurrencies, setChoisenCurrencies] = useState<string>('');
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
    setChoisenCurrencies(() => localCurrency.code);
  }, [localCurrency]);
  useEffect(() => {
    const sameCurrencies = checkboxes?.find(
      (element) => element === choisenCurrencies
    );
    if (sameCurrencies) dispatch(removeSelectСheckboxChart(sameCurrencies));
    setCheckboxState(() => ({
      USD: selectedCurrencies.includes('USD'),
      BYN: selectedCurrencies.includes('BYN'),
      RUB: selectedCurrencies.includes('RUB'),
    }));
  }, [checkboxes, choisenCurrencies]);

  const handleSelectMainCurrency = (event: ChangeEvent, newValue: string) => {
    const mappedDisplayCurrency = predisplayedChartsMapper(
      newValue,
      chartsRatesHistory
    );
    setChoisenCurrencies(newValue);
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
        dataTestId="chartsCurrencies"
        styles={classes.autocomplete}
        options={[...allCurrencies]}
        defValue={choisenCurrencies || t('chartsError')}
        onChange={handleSelectMainCurrency}
        label={undefined}
      />
      <FormGroup row>
        {checkboxes.map((element) =>
          choisenCurrencies !== element ? (
            <FormControlLabel
              key={element}
              control={
                <Checkbox
                  data-testid="currencyCheckbox"
                  name={element}
                  color="primary"
                  onChange={handleChangeCheckbox}
                  checked={checkboxState[element]}
                />
              }
              label={element}
            />
          ) : null
        )}
      </FormGroup>
    </ChartToolArea>
  );
};

export default ChartTopToolArea;
