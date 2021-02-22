import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {Input, Button} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Autocomplete from "@components/controls/Autocomplite";
import {
  CurrField,
} from "@components/converterComponents/converterStyles";


const CurrInputContainer = ({
  choicenCurr,
  handleInput,
  fieldValue,
  handleChangeCurr,
  id,
  handleDelete
}) => {
  const allCurrs = useSelector((state) => state.converter.allCurrs);
  const [moneyValue, setFieldValue] = useState({ [choicenCurr]: fieldValue });

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
    <CurrField>
      <Autocomplete
        onChange={(event, newValue) => {handleChangeCurr(id, newValue)}}
        options={allCurrs}
        defValue={choicenCurr}
        styles={{width: '10%'}}
      />
      <Input
        style={{maxWidth: '30%'}}
        min="0"
        type="number"
        value={moneyValue.value || "typed Incorrect symbols"}
        name={choicenCurr}
        onBlur={() => handleInput(moneyValue)}
        onChange={handleChange}
      />
      <Button name={choicenCurr} startIcon={<DeleteIcon/>} onClick={() => handleDelete(id)}/>
    </CurrField>
  );
};

export default CurrInputContainer;
