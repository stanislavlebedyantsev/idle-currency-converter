import {
  InputContainer,
  ContentContainer,
  Button,
  ToolsArea,
  CurrSelect,
} from "../converterStyles";
import CurrInputContainer from "./CurrInputContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  updateInputedValue,
  updateSelectValue,
} from "@actions/converterActionCreators";

const ConverterContent = (props) => {
  const moneyValues = useSelector((state) => state.converter.inputedValues);
  const converterState = useSelector((state) => state.converter);
  const dispatch = useDispatch();
  useEffect(() => {
    if (JSON.stringify(moneyValues) !== "[]") {
      localStorage.setItem("inputedValues", JSON.stringify(moneyValues));
    }
  }, [moneyValues, converterState]);
  const handleInput = (valueForUpdate) => {
    dispatch(updateInputedValue(valueForUpdate));
  };
  const handleSelect = (event) => {
    dispatch(updateSelectValue(event.target.value));
  };
  return (
    <ContentContainer>
      <InputContainer>
        {moneyValues.map((el) => {
          return (
            <CurrInputContainer
              allCurr={[...converterState.availableCurrs]}
              choicenCurr={el.currency}
              key={el.currency}
              fieldValue={el.value}
              handleInput={handleInput}
              handleSelect={handleSelect}
            />
          );
        })}
      </InputContainer>
      <ToolsArea>
        <Button>Update currency</Button>
        <CurrSelect name="currency" value="choice" onChange={handleSelect}>
          <option value="choice" disabled hidden>
            Please choice new currency
          </option>
          {[...converterState.availableCurrs].map((el) => (
            <option value={el} name={el} key={el}>
              {el}
            </option>
          ))}
        </CurrSelect>
      </ToolsArea>
    </ContentContainer>
  );
};

export default ConverterContent;
