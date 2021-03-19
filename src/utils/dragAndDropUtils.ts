import { IInputedValues } from '@/types/reducersTypes/';

export const dropCurrencyAfterDragging = (
  moneyValues: Array<IInputedValues>,
  startIndex: number,
  endIndex: number
): Array<IInputedValues> => {
  const result = [...moneyValues];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
