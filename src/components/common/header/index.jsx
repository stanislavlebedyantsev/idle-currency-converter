import { React } from 'react';
import { useDispatch } from 'react-redux';
import {
  CHARTS_ROUTER_PATH,
  MAP_ROUTER_PATH,
  CONVERTER_ROUTER_PATH,
} from '@/constants';
import { signOutRequest } from '@/actions/';
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
import { Link } from './styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  signOut: {
    fontSize: '2vh',
    borderRadius: 0,
  },
}));

const GlobalHeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(signOutRequest());
  };

  return (
    <AppBar position="static">
      <Toolbar color="primary">
        <Typography className={classes.title} variant="h6" noWrap>
          Currency converter
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Link to={CHARTS_ROUTER_PATH}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <TimelineIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to={MAP_ROUTER_PATH}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <MapIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to={CONVERTER_ROUTER_PATH}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountBalanceIcon />
              </Badge>
            </IconButton>
          </Link>
          <IconButton
            className={classes.signOut}
            color="inherit"
            onClick={handleClick}>
            <Badge color="secondary">
              <ExitToAppIcon /> Sign out
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
