/* eslint-disable react/jsx-closing-bracket-location */
import { React } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { Input, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { CurrField } from '@/components/converterComponents/styles';

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
}) => {
  const allCurrs = useSelector((state) => state.converter.allCurrs);
  const [moneyValue, setFieldValue] = useState({ [choicenCurr]: fieldValue });
  const classes = useStyles();

  useEffect(() => {
    setFieldValue(() => ({
      currency: choicenCurr,
      value: fieldValue,
    }));
  }, [fieldValue, choicenCurr]);

  const handleChange = (event) => {
    setFieldValue(() => ({
      currency: event.target.name,
      value: event.target.value,
    }));
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
            options={allCurrs}
            defValue={choicenCurr}
            styles={classes.autocomplete}
          />
          <Input
            className={classes.input}
            min="0"
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
