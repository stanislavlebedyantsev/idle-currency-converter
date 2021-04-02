import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Input, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { CurrField } from '@/components/converterComponents/styles';
import { IRootState } from '@/types/rootStateTypes';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';
import InputControl from './../controls/Input/index';
import { CurrencyName } from './styles';
import cc from 'currency-codes';
import CurrencyFlag from 'react-currency-flags';

type TProps = {
  choicenCurrencies: string;
  handleInput: (valueForUpdate: IInputedCurrenciesValues) => void;
  fieldValue: number;
  handleChangeCurr: (id: number, newValue: string) => void;
  id: number;
  handleDelete: (id: number) => void;
};

const useStyles = makeStyles({
  flag: {
    borderRadius: '50%',
    marginRight: 10,
  },
  input: {
    marginLeft: '10%',
  },
});

const CurrInputContainer = ({
  choicenCurrencies,
  handleInput,
  fieldValue,
  handleChangeCurr,
  id,
  handleDelete,
}: TProps): React.ReactElement => {
  const allCurrencies = useSelector(
    (state: IRootState) => state.converter.allCurrencies
  );
  const selectedCurrencyRate = useSelector(
    (state: IRootState) => state.converter.rate.rates[choicenCurrencies]
  );
  const [avaluebleCurrencies, setAvaluebleCurrs] = useState<Array<string>>(
    allCurrencies
  );
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const [moneyValue, setFieldValue] = useState<IInputedCurrenciesValues>({
    currency: choicenCurrencies,
    value: fieldValue,
  });
  const classes = useStyles();

  useEffect(() => {
    setFieldValue(() => ({
      currency: choicenCurrencies,
      value: fieldValue,
    }));
  }, [fieldValue, choicenCurrencies]);

  useEffect(() => {
    setAvaluebleCurrs(() =>
      allCurrencies.filter((element: string) => {
        const existedElement = values.find((valuesElement) => {
          return valuesElement.currency === element;
        });
        return (
          element === choicenCurrencies || element !== existedElement?.currency
        );
      })
    );
  }, [allCurrencies, values]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(
      (): IInputedCurrenciesValues => ({ 
        currency: choicenCurrencies,
        value: Number(event.target.value),
      })
    );
  };

  return (
    <Draggable draggableId={`${choicenCurrencies}${id}`} index={id}>
      {(provided) => (
        <CurrField
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <CurrencyName>
            <CurrencyFlag
              height={30}
              width={30}
              className={classes.flag}
              currency={choicenCurrencies}
            />{' '}
            <p>
              {choicenCurrencies} {(cc as any).code(choicenCurrencies).currency}
            </p>
          </CurrencyName>
          <InputControl
            className={classes.input}
            InputProps={{ inputProps: { min: 0 } }}
            type="number"
            value={moneyValue.value}
            name={choicenCurrencies}
            onBlur={() => handleInput(moneyValue)}
            onChange={handleChange}
            helperText={`1 USD = ${selectedCurrencyRate}${choicenCurrencies}`}
          />
          <Button
            name={choicenCurrencies}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(id)}
          />
        </CurrField>
      )}
    </Draggable>
  );
};

export default CurrInputContainer;
