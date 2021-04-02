import styled from 'styled-components';
import { MapContainer } from 'react-leaflet';

export const Map = styled(MapContainer).attrs((props) => ({ ...props }))`
  height: 100% !important;
  width: 100%;
  margin-left: 3%;
  @media (max-width: 720px) {
    width: 100%;
    margin: 0;
  }
`;
