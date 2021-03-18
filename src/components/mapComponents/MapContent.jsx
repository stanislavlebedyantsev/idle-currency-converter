import { React } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Marker, TileLayer, useMap, Tooltip } from 'react-leaflet';
import { isCurrencyExist } from '@/utils/';
import { Map } from '@/components/mapComponents/styles';

const MapContent = () => {
  const [existedCurrs, setExistedCurrs] = useState([]);
  const { name, capital, latlng, population, currencies } = useSelector(
    (state) => state.map.countryData
  );
  const allRates = useSelector((state) => {
    try {
      return state.converter.rate.rates;
    } catch (e) {
      return undefined;
    }
  });

  useEffect(() => {
    setExistedCurrs(() => isCurrencyExist(allRates, currencies));
  }, [allRates, currencies]);

  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <Map center={latlng} zoom={5}>
      <ChangeView center={latlng} zoom={5} />
      <TileLayer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {latlng ? (
        <Marker position={latlng}>
          <Tooltip>
            <span>
              Country name: {name}
              <br />
              Capital: {capital}
              <br />
              Population: {population}
              <br />
              Currencies to USD:{' '}
              {existedCurrs.length
                ? existedCurrs.map((el) => `${el.currency} - ${el.value}`)
                : 'unknowed'}
            </span>
          </Tooltip>
        </Marker>
      ) : null}
    </Map>
  );
};

export default MapContent;
