import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ConverterContent from "@components/converterComponents/converterComponentsContent/converterContent";
import { Container } from "@components/common/commonStyles/styles";
import { currencyRateRequest } from "@actions/converterActionCreators";

const ConverterLanding = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currencyRateRequest());
  }, [dispatch]);

  return (
    <Container>
      <ConverterContent />
    </Container>
  );
};

export default ConverterLanding;
