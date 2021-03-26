import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  CHARTS_ROUTE_PATH,
  MAP_ROUTE_PATH,
  CONVERTER_ROUTE_PATH,
} from '@/constants';
import { signOutRequest } from '@/actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import TimelineIcon from '@material-ui/icons/Timeline';
import MapIcon from '@material-ui/icons/Map';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import { Link, EmailBlock } from './styles';
import { IRootState } from '@/types/rootStateTypes';

const useStyles = makeStyles((theme) => ({
  bar: {
    zIndex: 0,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

const GlobalHeader = (): React.ReactElement => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userEmail = useSelector((state: IRootState) => state.user.user?.email);

  const handleClick = () => {
    dispatch(signOutRequest());
  };

  return (
    <AppBar position="sticky">
      <Toolbar color="primary">
        <Typography className={classes.title} variant="h6" noWrap>
          Currency converter
        </Typography>
        <div className={classes.grow} />
        <EmailBlock>{userEmail}</EmailBlock>
        <div>
          <Link to={CHARTS_ROUTE_PATH} data-testid="chartsBtn">
            <IconButton color="inherit">
              <Badge color="secondary">
                <TimelineIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to={MAP_ROUTE_PATH} data-testid="mapBtn">
            <IconButton color="inherit">
              <Badge color="secondary">
                <MapIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to={CONVERTER_ROUTE_PATH}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountBalanceIcon />
              </Badge>
            </IconButton>
          </Link>
          <IconButton
            color="inherit"
            onClick={handleClick}
            data-testid="signOutBtn">
            <Badge color="secondary">
              <ExitToAppIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
