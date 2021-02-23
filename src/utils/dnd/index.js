export const setMovedCurrency = (
  moneyValues,
  field,
  afterField,
  id,
  afterId
) => {
  const copyValues = moneyValues;
  copyValues[id] = afterField;
  copyValues[afterId] = field;
  return copyValues;
};
