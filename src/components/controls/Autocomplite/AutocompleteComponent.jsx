import {Autocomplete} from './styles'
import InputControl from '@components/controls/Input/component'

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
          <InputControl
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
