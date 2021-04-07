import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import CurrencyInputContainer from './InputContainer';
import ToolsAreaComponent from './ToolAreaComponent';
import ConverterHeader from '@/components/common/componentsHeader';
import {
  updateInputedValue,
  addNewValueFromSelect,
  updateCurrencySelector,
  deleteCurrencyField,
  swapCurrencyViews,
  changeDispayCharsData,
} from '@/actions';
import { IRootState } from '@/types/rootStateTypes';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';
import {
  updateAfterChange,
  convertBeforInput,
  updateCurrencyBeforeSelect,
  deleteCurrencyFromField,
  dropCurrencyAfterDragging,
  predisplayedChartsMapper,
} from '@/utils/';
import { InputContainer, Title } from '@/components/converterComponents/styles';
import { ContentContainer } from '@/components/common/componentStyles/styles';
import { useTranslation } from 'react-i18next';
import LineChartContainer from '@/components/chartsComponents/TestLineChart';
import Info from '@/components/common/info/component';
import moment from 'moment';
import { TimeNow } from './styles';

const ConverterContent = (): React.ReactElement => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const values = useSelector(
    (state: IRootState) => state.converter.inputedValues
  );
  const converterState = useSelector((state: IRootState) => state.converter);
  const chartsRatesHistory = useSelector(
    (store: IRootState) => store.charts.ratesHistory
  );
  const { base, rates } = converterState.rate || { undefined };

  useEffect(() => {
    const mappedDisplayCurrency = predisplayedChartsMapper(
      values,
      chartsRatesHistory
    );
    dispatch(changeDispayCharsData(mappedDisplayCurrency));
  }, [values, dispatch, chartsRatesHistory]);
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

  const handleChangeCurrency = (id: number, newValue: string) => {
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
      <Title>
        <ConverterHeader title={t('converterTitle')} />
        <ToolsAreaComponent onChangeHandle={handleSelect} />
      </Title>
      <Info infoText={t('converterDescription')} />
      <InputContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {values.map((element, id) => (
                  <CurrencyInputContainer
                    choicenCurrencies={element.currency}
                    key={element.currency + id}
                    id={id}
                    fieldValue={element.value}
                    handleInput={handleInput}
                    handleChangeCurr={handleChangeCurrency}
                    handleDelete={handleDelete}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </InputContainer>
      <TimeNow>{`Today, ${moment()
        .utc()
        .format('MMM DD, YYYY | HH:MM')} UTC`}</TimeNow>
      <LineChartContainer />
    </ContentContainer>
  );
};

export default ConverterContent;
