import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeError } from '@/actions/';
import { AlertError } from './styles';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { errorValue, isError } = useSelector((state) => state.error);

  const handleClick = () => {
    dispatch(removeError());
  };

  return (
    <div className={classes.root}>
      <Collapse in={isError}>
        <AlertError
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClick}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }>
          {errorValue}
        </AlertError>
      </Collapse>
    </div>
  );
};

export default Error;
