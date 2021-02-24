export const setMovedCurrency = (
  moneyValues,
  startIndex,
  endIndex
) => {
  const result = [...moneyValues];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
