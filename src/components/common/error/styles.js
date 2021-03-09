import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";

export const AlertError = styled(Alert).attrs((props) => ({ ...props }))`
  position: absolute;
  top: 0;
`;
