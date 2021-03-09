import ConverterContent from "@components/converterComponents/converterComponentsContent/converterContent";
import Error from "@components/common/error/component";
import { Container } from "@components/common/commonStyles/styles";

const ConverterLanding = (props) => {
  return (
    <Container>
      <Error />
      <ConverterContent />
    </Container>
  );
};

export default ConverterLanding;
