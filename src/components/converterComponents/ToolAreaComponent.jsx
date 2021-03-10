import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@/components/controls/Autocomplite';
import { currencyRateRequest } from '@/actions/';
import { ToolsArea } from '@/components/converterComponents/styles';

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClickHandle = () => {
    dispatch(currencyRateRequest());
  };

  return (
    <ToolsArea>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
        onClick={onClickHandle}
      >
        Update currency
      </Button>
      <Autocomplete
        onChange={onChangeHandle}
        options={allCurrs}
        defValue="Choice new currency"
        styles={classes.autocomplete}/>
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
