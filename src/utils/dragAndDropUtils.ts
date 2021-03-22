import { IInputedCurrenciesValues } from '@/types/reducersTypes';

export const dropCurrencyAfterDragging = (
  moneyValues: Array<IInputedCurrenciesValues>,
  startIndex: number,
  endIndex: number
): Array<IInputedCurrenciesValues> => {
  const result = [...moneyValues];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
