import { useDispatch, useSelector } from "react-redux";
import CurrInputContainer from "./CurrInputContainer";
import ToolsAreaComponent from "./ToolsAreaComponent";
import {
  updateInputedValue,
  addNewValueFromSelect,
  updateCurrencySelector,
  deleteCurrencyField,
} from "@actions/converterActionCreators";
import {
  updateAfterChange,
  convertBeforInput,
  updateCurrencyBeforeSelect,
  deleteCurrencyFromField,
} from "@utils/data-mappers";
import {
  InputContainer,
  ContentContainer,
} from "@components/converterComponents/converterStyles";

const ConverterContent = (props) => {
  const dispatch = useDispatch();
  const moneyValues = useSelector((state) => state.converter.inputedValues);
  const converterState = useSelector((state) => state.converter);
  const { base, rates } = converterState.rate || { undefined };

  const handleInput = (valueForUpdate) => {
    const updatedCurrency = convertBeforInput(
      valueForUpdate,
      base,
      rates,
      moneyValues
    );
    dispatch(updateInputedValue(updatedCurrency));
  };

  const handleSelect = (event, newValue) => {
    const updatedValue = updateCurrencyBeforeSelect(
      base,
      rates,
      newValue,
      moneyValues
    );
    dispatch(addNewValueFromSelect(updatedValue));
  };

  const handleChangeCurr = (id, newValue) => {
    const updatedCurrency = updateAfterChange(
      id,
      newValue,
      base,
      rates,
      moneyValues
    );
    dispatch(updateCurrencySelector(updatedCurrency));
  };

  const handleDelete = (id) => {
    const newInputFields = deleteCurrencyFromField(id, moneyValues);
    dispatch(deleteCurrencyField(newInputFields));
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
              handleDelete={handleDelete}
            />
          );
        })}
      </InputContainer>
      <ToolsAreaComponent onChangeHandle={handleSelect} />
    </ContentContainer>
  );
};

export default ConverterContent;
