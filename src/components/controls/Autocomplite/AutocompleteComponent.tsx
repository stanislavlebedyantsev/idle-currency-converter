import React from 'react';
import { Autocomplete } from './styles';
import InputControl from '@/components/controls/Input/component';
import { RenderOptions } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

type AutoCompleteFieldProps<T> = {
  onChange: (event: React.ChangeEvent, newValue: string) => void;
  options: Array<string> | Array<React.ReactElement>;
  defValue?: string;
  label?: string;
  dataTestId?: string;
  styles?: T;
  variant?: string;
};

const useStyles = makeStyles((theme) => ({
  input: {
    paddingRight: 30,
    borderBottom: '0 !important',
  },
}));

const AutocompleteComponent = <T extends string>({
  onChange,
  options,
  defValue,
  label,
  dataTestId,
  styles,
  variant,
}: AutoCompleteFieldProps<T>): React.ReactElement => {
  const { t } = useTranslation();
  const classes = useStyles();
  const renderInput = (params: RenderOptions) => {
    return (
      <InputControl
        className={classes.input}
        {...params}
        size="small"
        label={label || t('defaultLabel')}
        variant={variant}
      />
    );
  };

  const renderOptions = (option: RenderOptions) => option;

  return (
    <Autocomplete<string | React.ComponentType<any>>
      className={styles}
      data-testid={dataTestId}
      name="currency"
      value={defValue}
      fullWidth
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
