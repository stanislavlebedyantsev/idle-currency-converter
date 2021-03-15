import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { currencyRateRequest } from '@/actions/';
import {
  ToolsArea,
  UpdateButton,
} from '@/components/converterComponents/styles';

const useStyles = makeStyles({
  autocomplete: {
    width: '100%',
  },
  button: {
    marginBottom: '2%',
  },
});

const ToolsAreaComponent = ({ onChangeHandle }) => {
  const allCurrs = useSelector((state) => state.converter.allCurrs);
  const [avaluebleCurrs, setAvaluebleCurrs] = useState(allCurrs);
  const moneyValues = useSelector((state) => state.converter.inputedValues);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch(currencyRateRequest());
  };
  useEffect(() => {
    setAvaluebleCurrs(() =>
      allCurrs.filter((el) => {
        const existedElement = moneyValues.find((element) => {
          return element.currency === el;
        });
        return el !== existedElement?.currency;
      })
    );
  }, [allCurrs, moneyValues]);
  const onSelect = (event, newValue) => {
    onChangeHandle(event, newValue);
  };

  return (
    <ToolsArea>
      <UpdateButton
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={onClickHandle}>
        Click for update currency rates
      </UpdateButton>
      <Autocomplete
        onChange={onSelect}
        options={avaluebleCurrs}
        label={'Type here for choice new currency'}
        defValue={''}
        styles={classes.autocomplete}
      />
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
