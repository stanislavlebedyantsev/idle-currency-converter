import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import CurrInputContainer from './InputContainer';
import ToolsAreaComponent from './ToolAreaComponent';
import ConverterHeader from '@/components/common/componentsHeader/';
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
import { IInputedValues } from '@/types/reducersTypes';

const ConverterContent = (): React.ReactElement => {
  const dispatch = useDispatch();
  const moneyValues = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const converterState = useSelector((state: IRootState) => state.converter);
  const { base, rates } = converterState.rate || { undefined };

  const handleInput = (valueForUpdate: IInputedValues) => {
    const updatedCurrency: Array<IInputedValues> = convertBeforInput(
      valueForUpdate,
      base,
      rates,
      moneyValues
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
      moneyValues
    );
    dispatch(addNewValueFromSelect(updatedValue));
  };

  const handleChangeCurr = (id: number, newValue: string) => {
    const updatedCurrency = updateAfterChange(
      id,
      newValue,
      base,
      rates,
      moneyValues
    );
    dispatch(updateCurrencySelector(updatedCurrency));
  };

  const handleDelete = (id: number) => {
    const newInputFields = deleteCurrencyFromField(id, moneyValues);
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
      moneyValues,
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
