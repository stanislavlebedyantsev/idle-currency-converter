import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import CurrInputContainer from './InputContainer';
import ToolsAreaComponent from './ToolAreaComponent';
import ConverterHeader from '@/components/common/conveterHeader/';
import {
  updateInputedValue,
  addNewValueFromSelect,
  updateCurrencySelector,
  deleteCurrencyField,
  updateSwappedCurrency,
} from '@/actions/';
import {
  updateAfterChange,
  convertBeforInput,
  updateCurrencyBeforeSelect,
  deleteCurrencyFromField,
  dropCurrencyAfterDragging,
} from '@/utils/';
import { InputContainer } from '@/components/converterComponents/styles';
import { ContentContainer } from '@/components/common/commonStyles/styles';

const ConverterContent = () => {
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

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const currencyList = dropCurrencyAfterDragging(
      moneyValues,
      result.source.index,
      result.destination.index
    );

    dispatch(updateSwappedCurrency(currencyList));
  };

  return (
    <ContentContainer>
      <ConverterHeader />
      <InputContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {moneyValues.map((el, id) => (
                  <CurrInputContainer
                    choicenCurr={el.currency}
                    key={el.currency + id}
                    id={id}
                    fieldValue={el.value}
                    handleInput={handleInput}
                    handleChangeCurr={handleChangeCurr}
                    handleDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </InputContainer>
      <ToolsAreaComponent onChangeHandle={handleSelect} />
    </ContentContainer>
  );
};

export default ConverterContent;
