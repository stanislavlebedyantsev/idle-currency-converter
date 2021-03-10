import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const Map = styled(MapContainer).attrs((props) => ({ ...props }))`
  height: 100% !important;
  width: 65vw;
  margin-left: 3%;
`;
