import styled from "styled-components";
import { MapContainer } from "react-leaflet";

export const Map = styled(MapContainer).attrs((props) => ({ ...props }))`
  height: 75%;
  width: 50%;
`;
export const MapBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-flow: row;
  margin: 5%;
  height: 50vh;
`;
