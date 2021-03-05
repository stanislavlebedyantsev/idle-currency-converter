import { CHARTS_ROUTER_PATH, MAP_ROUTER_PATH } from "@/constants";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import TimelineIcon from "@material-ui/icons/Timeline";
import MapIcon from '@material-ui/icons/Map';
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "./styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

const GlobalHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
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
          <Link to={"/"}>
            <IconButton color="inherit">
              <Badge color="secondary">
                <AccountBalanceIcon />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
