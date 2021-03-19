import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Input, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { CurrField } from '@/components/converterComponents/styles';
import { IRootState } from '@/types/rootStateTypes';
import { IInputedValues } from '@/types/reducersTypes/';

type TProps = {
  choicenCurr: string;
  handleInput: (valueForUpdate: IInputedValues) => void;
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
  choicenCurr,
  handleInput,
  fieldValue,
  handleChangeCurr,
  id,
  handleDelete,
}: TProps): React.ReactElement => {
  const allCurrs = useSelector((state: IRootState) => state.converter.allCurrs);
  const [avaluebleCurrs, setAvaluebleCurrs] = useState<Array<string>>(allCurrs);
  const moneyValues = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const [moneyValue, setFieldValue] = useState<IInputedValues>({
    currency: choicenCurr,
    value: fieldValue,
  });
  const classes = useStyles();

  useEffect(() => {
    setFieldValue(() => ({
      currency: choicenCurr,
      value: fieldValue,
    }));
  }, [fieldValue, choicenCurr]);

  useEffect(() => {
    setAvaluebleCurrs(() =>
      allCurrs.filter((el: string) => {
        const existedElement = moneyValues.find((element) => {
          return element.currency === el;
        });
        return el === choicenCurr || el !== existedElement?.currency;
      })
    );
  }, [allCurrs, moneyValues]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(
      (): IInputedValues => ({
        currency: choicenCurr,
        value: Number(event.target.value),
      })
    );
  };

  return (
    <Draggable draggableId={`${choicenCurr}${id}`} index={id}>
      {(provided) => (
        <CurrField
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Autocomplete
            onChange={(event, newValue) => {
              handleChangeCurr(id, newValue);
            }}
            options={avaluebleCurrs}
            defValue={choicenCurr}
            styles={classes.autocomplete}
          />
          <Input
            className={classes.input}
            inputProps={{ inputProps: { min: 0 } }}
            type="number"
            value={moneyValue.value || 'typed Incorrect symbols'}
            name={choicenCurr}
            onBlur={() => handleInput(moneyValue)}
            onChange={handleChange}
          />
          <Button
            name={choicenCurr}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(id)}
          />
        </CurrField>
      )}
    </Draggable>
  );
};

export default CurrInputContainer;
