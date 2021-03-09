import {Autocomplete, Input} from './styles'

const AutocompleteComponent = ({
  onChange,
  options,
  defValue,
  styles,
}) => {

  return (
    <Autocomplete
      className={styles}
      name="currency"
      value={defValue}
      onChange={onChange}
      options={[...options]}
      renderInput={(params) => {
        return (
          <Input
            {...params}
            size="small"
            label="Currency"
            variant="outlined"
          />
        );
      }}
      renderOption={(option) => option}
      clearOnBlur
      selectOnFocus
      disableClearable
    />
  );
};

export default AutocompleteComponent;
