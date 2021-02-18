import ConverterContent from "./converterContent/converterContent";
import { Container } from "./converterStyles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currencyRateRequest,
} from "@actions/converterActionCreators";

const ConverterContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyRateRequest());
  }, []);
  return <Container>
    <ConverterContent/>
  </Container>;
};

export default ConverterContainer;
