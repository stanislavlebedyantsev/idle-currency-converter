import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Autocomplete  from "@components/controls/Autocomplite";
import {
  ToolsArea,
} from "@components/converterComponents/converterStyles";


const useStyles = makeStyles({
  autocomplete: {
    width:'100%'
  },
  button:{
    marginBottom: "5%" 
  }
})

const ToolsAreaComponent = ({onChangeHandle}) => {
  const allCurrs = useSelector((state) => state.converter.allCurrs);
  const classes = useStyles()

  return (
    <ToolsArea>
      <Button
        className={classes.button}
        color="primary"
        variant="contained"
      >
        Update currency
      </Button>
      <Autocomplete
        onChange={onChangeHandle}
        options={allCurrs}
        defValue='Choice new currency'
        styles={classes.autocomplete}
      />
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
