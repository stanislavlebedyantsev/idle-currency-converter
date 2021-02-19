import TextField from "@material-ui/core/TextField";
import {Autocomplete} from './styles'

const AutocompleteComponent = ({
  onChange,
  options,
  defValue,
  styles,
}) => {
  return (
    <Autocomplete
      style={styles}
      name="currency"
      value={defValue}
      onChange={onChange}
      options={typeof(options) !== 'object' ? [...options] : []}
      renderInput={(params) => {
        const paramsWithNewFont = {
          ...params,
          InputProps: {
            ...params.InputProps,
            style: {
              fontSize: 16,
            },
          },
        };
        return (
          <TextField
            {...paramsWithNewFont}
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
