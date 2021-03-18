import { IInputedValues } from 'src/types/reducersTypes/';

export const dropCurrencyAfterDragging = (
  moneyValues: IInputedValues[],
  startIndex: number,
  endIndex: number
): IInputedValues[] => {
  const result = [...moneyValues];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
