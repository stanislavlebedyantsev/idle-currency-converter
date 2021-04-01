import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { currencyRateRequest } from '@/actions';
import {
  ToolsArea,
  UpdateButton,
} from '@/components/converterComponents/styles';
import { IRootState } from '@/types/rootStateTypes';
import { useTranslation } from 'react-i18next';

type TProps = {
  onChangeHandle: (event: React.ChangeEvent<Element>, newValue: string) => void;
};

const useStyles = makeStyles({
  autocomplete: {
    width: '100%',
  },
  button: {
    marginBottom: '2%',
  },
});

const ToolsAreaComponent = ({ onChangeHandle }: TProps): React.ReactElement => {
  const { t } = useTranslation();
  const allCurrencies = useSelector(
    (state: IRootState) => state.converter.allCurrencies
  );
  const [avaluebleCurrencies, setAvaluebleCurrs] = useState<Array<string>>(
    allCurrencies
  );
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch(currencyRateRequest());
  };
  useEffect(() => {
    setAvaluebleCurrs(() =>
      allCurrencies.filter((el) => {
        const existedElement = values.find((element) => {
          return element.currency === el;
        });
        return el !== existedElement?.currency;
      })
    );
  }, [allCurrencies, values]);
  const onSelect = (event: React.ChangeEvent<Element>, newValue: string) => {
    onChangeHandle(event, newValue);
  };

  return (
    <ToolsArea>
      <UpdateButton
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={onClickHandle}>
        {t('converterButton')}
      </UpdateButton>
      <Autocomplete
				dataTestId='currencyChoice'
        onChange={onSelect}
        options={avaluebleCurrencies}
        label={t('converterLabel')}
        defValue={undefined}
        styles={classes.autocomplete}
      />
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
