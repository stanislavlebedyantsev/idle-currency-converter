import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import CurrInputContainer from './InputContainer';
import ToolsAreaComponent from './ToolAreaComponent';
import ConverterHeader from '@/components/common/componentsHeader';
import {
  updateInputedValue,
  addNewValueFromSelect,
  updateCurrencySelector,
  deleteCurrencyField,
  swapCurrencyViews,
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
import { IRootState } from '@/types/rootStateTypes';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';

const ConverterContent = (): React.ReactElement => {
  const dispatch = useDispatch();
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const converterState = useSelector((state: IRootState) => state.converter);
  const { base, rates } = converterState.rate || { undefined };

  const handleInput = (valueForUpdate: IInputedCurrenciesValues) => {
    const updatedCurrency: Array<IInputedCurrenciesValues> = convertBeforInput(
      valueForUpdate,
      base,
      rates,
      values
    );
    dispatch(updateInputedValue(updatedCurrency));
  };

  const handleSelect = (
    event: React.ChangeEvent<Element>,
    newValue: string
  ) => {
    const updatedValue = updateCurrencyBeforeSelect(
      base,
      rates,
      newValue,
      values
    );
    dispatch(addNewValueFromSelect(updatedValue));
  };

  const handleChangeCurr = (id: number, newValue: string) => {
    const updatedCurrency = updateAfterChange(
      id,
      newValue,
      base,
      rates,
      values
    );
    dispatch(updateCurrencySelector(updatedCurrency));
  };

  const handleDelete = (id: number) => {
    const newInputFields = deleteCurrencyFromField(id, values);
    dispatch(deleteCurrencyField(newInputFields));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const currencyList = dropCurrencyAfterDragging(
      values,
      result.source.index,
      result.destination.index
    );

    dispatch(swapCurrencyViews(currencyList));
  };

  return (
    <ContentContainer>
      <ConverterHeader
        title="Welcome to currency converter page"
        discription="If you want to swap fields you can drag them and drop"
      />
      <InputContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {values.map((element, id) => (
                  <CurrInputContainer
                    choicenCurrencies={element.currency}
                    key={element.currency + id}
                    id={id}
                    fieldValue={element.value}
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
