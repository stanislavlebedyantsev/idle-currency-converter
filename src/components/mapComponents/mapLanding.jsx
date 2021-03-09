import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Error from "@components/common/error/error";
import MapContent from "./mapContent/mapContent";
import MapAutocomplete from "./mapContent/mapAutocomplete";
import { requestCountryList } from "@actions/index";
import {
  Container,
  ContentContainer,
} from "@components/common/commonStyles/styles";
import { MapBlock } from "./mapStyles";

const MapLanding = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestCountryList());
  }, [dispatch]);

  return (
    <Container>
      {/* <Error /> */}
      <ContentContainer>
        <MapBlock>
          <MapAutocomplete />
          <MapContent />
        </MapBlock>
      </ContentContainer>
    </Container>
  );
};

export default MapLanding;
