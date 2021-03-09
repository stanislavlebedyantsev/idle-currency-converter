import { useSelector } from "react-redux";
import { AlertError } from "./styles";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = () => {
  const classes = useStyles();
  const errors = useSelector((state) => state.error);
  console.log(errors);
  return (
    <div className={classes.root}>
      {Object.values(errors).filter((el) => el !== '').length
        ? Object.values(errors).map((el) => {
            if (el !== undefined)
              return <AlertError severity="error">{el}</AlertError>;
          })
        : null}
    </div>
  );
};

export default Error;
