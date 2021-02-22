import {
  ToolsArea,
} from "@components/converterComponents/converterStyles";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import Autocomplete  from "@components/controls/Autocomplite";

const ToolsAreaComponent = ({onChangeHandle}) => {
  const allCurrs = useSelector((state) => state.converter.allCurrs);
  return (
    <ToolsArea>
      <Button
        style={{ marginBottom: "5%" }}
        color="primary"
        variant="contained"
      >
        Update currency
      </Button>
      <Autocomplete
        onChange={onChangeHandle}
        options={allCurrs}
        defValue='Choice new currency'
        styles={{width:'100%'}}
      />
    </ToolsArea>
  );
};
export default ToolsAreaComponent;
