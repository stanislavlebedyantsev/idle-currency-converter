import {
  InputContainer,
  ContentContainer,
} from "@components/converterComponents/converterStyles";
import CurrInputContainer from "./CurrInputContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import {
  updateInputedValue,
  addNewValueFromSelect,
  updateCurrencySelector
} from "@actions/converterActionCreators";
import ToolsAreaComponent from "./ToolsAreaComponent";
import { updateAfterChange, convertBeforInput, updateCurrencyBeforeSelect } from '@utils/data-mappers';

const ConverterContent = (props) => {
  const moneyValues = useSelector((state) => state.converter.inputedValues);
  const converterState = useSelector((state) => state.converter);
  const {base, rates} = converterState.rate || {undefined, undefined}
  const dispatch = useDispatch();
  const handleInput = (valueForUpdate) => {
    const updatedCurrency = convertBeforInput(valueForUpdate, base, rates, moneyValues)
    dispatch(updateInputedValue(updatedCurrency));
  };
  const handleSelect = (event, newValue) => {
    const updatedValue = updateCurrencyBeforeSelect(base, rates, newValue, moneyValues)
    dispatch(addNewValueFromSelect(updatedValue));
  };
  const handleChangeCurr = (id, newValue) => {
    const updatedCurrency = updateAfterChange(id, newValue, base, rates, moneyValues)
    dispatch(updateCurrencySelector(updatedCurrency));
  };
  
  return (
    <ContentContainer>
      <InputContainer>
        {moneyValues.map((el, id) => {
          return (
            <CurrInputContainer
              choicenCurr={el.currency}
              key={el.currency + id}
              id={id}
              fieldValue={el.value}
              handleInput={handleInput}
              handleChangeCurr={handleChangeCurr}
            />
          );
        })}
      </InputContainer>
      <ToolsAreaComponent
        onChangeHandle={handleSelect}
      />
    </ContentContainer>
  );
};

export default ConverterContent;
