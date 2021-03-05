import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Marker, Popup, TileLayer } from "react-leaflet";
import { isCurrencyExist } from "@utils/map/index";
import { Map } from "@components/mapComponents/mapStyles";
import { Redirect } from "react-router";

const MapContent = () => {
  const [existedCurrs, setExistedCurrs] = useState([]);
  const { name, capital, latlng, population, currencies } = useSelector(
    (state) => state.map.countryData
  );
  const allRates = useSelector((state) => state.converter.rate.rates);

  useEffect(() => {
    setExistedCurrs(() => isCurrencyExist(allRates, currencies));
  }, [allRates, currencies]);
  return (
    <Map style={{ height: "50vh" }} center={latlng} zoom={1}>
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={latlng}>
        <Popup>
          <span>
            Country name: {name}
            <br />
            Capital: {capital}
            <br />
            Population: {population}
            <br />
            Currencies to USD: {existedCurrs.length ? existedCurrs.map((el) => `${el.currency} - ${el.value}`) : 'unknowed'}
          </span>
        </Popup>
      </Marker>
    </Map>
  );
};

export default MapContent;
