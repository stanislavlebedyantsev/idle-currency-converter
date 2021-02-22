import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ConverterContent from "@components/converterComponents/converterComponentsContent/converterContent";
import { Container } from "@components/converterComponents/converterStyles";
import {
  geolocationRequest,
} from "@actions/converterActionCreators";

const ConverterContainer = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(geolocationRequest());
  }, [dispatch]);

  return <Container>
    <ConverterContent/>
  </Container>;
};

export default ConverterContainer;
