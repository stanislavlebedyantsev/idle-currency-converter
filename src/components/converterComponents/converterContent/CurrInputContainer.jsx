import { useState, useEffect } from "react";
import {
  ValueInput,
  CurrField,
  CurrLabel,
  CurrSelect,
} from "../converterStyles";

const CurrInputContainer = ({
  choicenCurr,
  allCurr,
  handleInput,
  fieldValue,
  handleSelect,
}) => {
  const [moneyValue, setFieldValue] = useState({ [choicenCurr]: fieldValue });
  useEffect(() => {
    setFieldValue(() => (
      {
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
      {/* <CurrLabel> {choicenCurr}</CurrLabel> */}
      <CurrSelect name="currency" defaultValue={choicenCurr}>
        <option value={choicenCurr}>{choicenCurr}</option>
        {allCurr.map((el) => (
          <option value={el} name={el} key={el}>
            {el}
          </option>
        ))}
      </CurrSelect>
      <ValueInput
        type="text"
        value={moneyValue.value || "typed Incorrect symbols"}
        name={choicenCurr}
        onBlur={() => handleInput(moneyValue)}
        onChange={handleChange}
      />
    </CurrField>
  );
};

export default CurrInputContainer;
