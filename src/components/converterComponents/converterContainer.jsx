import ConverterContent from "@components/converterComponents/converterComponentsContent/converterContent";
import { Container } from "@components/converterComponents/converterStyles";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  currencyRateRequest,
} from "@actions/converterActionCreators";

const ConverterContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currencyRateRequest());
  }, [dispatch]);
  return <Container>
    <ConverterContent/>
  </Container>;
};

export default ConverterContainer;
