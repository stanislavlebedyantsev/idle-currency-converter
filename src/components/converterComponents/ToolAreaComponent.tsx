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
      <Autocomplete
				dataTestId='currencyChoice'
        onChange={onSelect}
        options={avaluebleCurrencies}
        label={t('converterLabel')}
      />
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
