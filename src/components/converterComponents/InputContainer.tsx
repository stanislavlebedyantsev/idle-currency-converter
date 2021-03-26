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
    width: '25%',
  },
  input: {
    maxWidth: '30%',
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
        return element === choicenCurrencies || element !== existedElement?.currency;
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
          <Autocomplete
            onChange={(event, newValue) => {
              handleChangeCurr(id, newValue);
            }}
						dataTestId='inputFieldCurrencyChoice'
            options={avaluebleCurrencies}
            defValue={choicenCurrencies}
            styles={classes.autocomplete}
          />
          <Input
            className={classes.input}
            inputProps={{ inputProps: { min: 0 } }}
            type="number"
            value={moneyValue.value}
            name={choicenCurrencies}
            onBlur={() => handleInput(moneyValue)}
            onChange={handleChange}
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
