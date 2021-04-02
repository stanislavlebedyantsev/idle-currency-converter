import React from 'react';
import { Autocomplete } from './styles';
import InputControl from '@/components/controls/Input/component';
import { RenderOptions } from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

type AutoCompleteFieldProps = {
  onChange: (event: React.ChangeEvent, newValue: string) => void;
  options: Array<string>;
  defValue?: string;
  label?: string;
  dataTestId?: string;
};

const useStyles = makeStyles((theme) => ({
  input: {
    paddingRight: 20,
  },
}));

const AutocompleteComponent = ({
  onChange,
  options,
  defValue,
  label,
  dataTestId,
}: AutoCompleteFieldProps): React.ReactElement => {
  const { t } = useTranslation();
  const classes = useStyles();
  const renderInput = (params: RenderOptions) => {
    return (
      <InputControl
        className={classes.input}
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
