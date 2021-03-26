import React from 'react';
import { Autocomplete } from './styles';
import InputControl from '@/components/controls/Input/component';
import { RenderOptions } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

type AutoCompleteFieldProps<T> = {
  onChange: (event: React.ChangeEvent, newValue: string) => void;
  options: Array<string>;
  defValue: string;
  styles: T;
  label?: string;
	dataTestId?: string
};

const AutocompleteComponent = <T extends string>({
  onChange,
  options,
  defValue,
  styles,
  label,
	dataTestId
}: AutoCompleteFieldProps<T>): React.ReactElement => {
  const { t } = useTranslation();
  const renderInput = (params: RenderOptions) => {
    return (
      <InputControl
        {...params}
        size="small"
        label={label || t('defaultLabel')}
        variant="outlined"
      />
    );
  };

  const renderOptions = (option: RenderOptions) => option;

  return (
    <Autocomplete<string | React.ComponentType<any>>
			data-testid={dataTestId}
      className={styles}
      name="currency"
      value={defValue}
      onChange={onChange}
      options={[...options]}
      renderInput={renderInput}
      renderOption={renderOptions}
      clearOnBlur
      selectOnFocus
      disableClearable
    />
  );
};

export default AutocompleteComponent;
