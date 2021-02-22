import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Autocomplete  from "@components/controls/Autocomplite";
import {
  ToolsArea,
} from "@components/converterComponents/converterStyles";

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
