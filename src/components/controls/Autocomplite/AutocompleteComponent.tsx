import React from 'react';
import { Autocomplete } from './styles';
import InputControl from '@/components/controls/Input/component';
import { RenderOptions } from '@testing-library/react';

type AutoCompleteFieldProps<T> = {
  onChange: (event: React.ChangeEvent, newValue: string) => void;
  options: Array<string>;
  defValue: string;
  styles: T;
  label?: string | undefined;
};


const AutocompleteComponent = <T extends string>({
  onChange,
  options,
  defValue,
  styles,
  label,
}: AutoCompleteFieldProps<T>): React.ReactElement => {
  return (
    <Autocomplete<string | React.ComponentType<any>>
      className={styles}
      name="currency"
      value={defValue}
      onChange={onChange}
      options={[...options]}
      renderInput={(params: RenderOptions) => {
        return (
          <InputControl
            {...params}
            size="small"
            label={label || 'Currency'}
            variant="outlined"
          />
        );
      }}
      renderOption={(option: RenderOptions) => option}
      clearOnBlur
      selectOnFocus
      disableClearable
    />
  );
};

export default AutocompleteComponent;
