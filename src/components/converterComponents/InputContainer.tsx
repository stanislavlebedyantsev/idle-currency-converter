import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Input, Button } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { CurrField } from '@/components/converterComponents/styles';
import { IRootState } from '@/types/rootStateTypes';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';
import InputControl from './../controls/Input/index';
import Divider from '@material-ui/core/Divider';
import { CurrencyName, InputCurrencieField, CurrencyInput } from './styles';
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
  autocomplete: {
    width: '90% !important',
    border: '0 !important',
    marginRight: '0 !important',
  },
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
    (state: IRootState) =>
      state.converter.rate.rates[choicenCurrencies.substring(0, 3)]
  );
  const [avaluebleCurrencies, setAvaluebleCurrs] = useState<Array<string>>(
    allCurrencies
  );
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const [moneyValue, setFieldValue] = useState<IInputedCurrenciesValues>({
    currency: choicenCurrencies.substring(0, 3),
    value: fieldValue,
  });
  const classes = useStyles();
  useEffect(() => {
    setFieldValue(() => ({
      currency: choicenCurrencies.substring(0, 3),
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
              currency={choicenCurrencies.substring(0, 3)}
            />{' '}
            <Autocomplete
              styles={classes.autocomplete}
              onChange={(event, newValue) => {
                handleChangeCurr(id, newValue);
              }}
              options={avaluebleCurrencies.map(
                (element: string) =>
                  `${element} - ${
                    (cc as any).code(element.substring(0, 3))?.currency
                  }`
              )}
              dataTestId="inputFieldCurrencyChoice"
              defValue={`${choicenCurrencies.substring(0, 3)} - ${
                (cc as any).code(choicenCurrencies.substring(0, 3))?.currency
              }`}
              label={' '}
            />
          </CurrencyName>
          <InputCurrencieField>
            <CurrencyInput
              className={classes.input}
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              value={moneyValue.value}
              name={choicenCurrencies}
              onBlur={() => handleInput(moneyValue)}
              onChange={handleChange}
              label={`1 USD = ${selectedCurrencyRate} ${choicenCurrencies.substring(
                0,
                3
              )}`}
            />
            <Button
              name={choicenCurrencies}
              startIcon={<ClearIcon />}
              onClick={() => handleDelete(id)}
            />
          </InputCurrencieField>
          <Divider variant="middle" />
        </CurrField>
      )}
    </Draggable>
  );
}; 

export default CurrInputContainer;
