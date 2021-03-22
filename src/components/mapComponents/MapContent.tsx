import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Marker, TileLayer, useMap, Tooltip } from 'react-leaflet';
import { IRootState } from '@/types/rootStateTypes';
import { IInputedCurrenciesValues } from '@/types/reducersTypes';
import { LatLngExpression } from 'leaflet';
import { isCurrencyExist } from '@/utils/';
import { Map } from '@/components/mapComponents/styles';
import { useTranslation } from 'react-i18next';

type TView = {
  center: LatLngExpression;
  zoom: number;
};

const MapContent = (): React.ReactElement => {
	const {t} = useTranslation()
  const [existedCurrencies, setExistedCurrs] = useState<Array<IInputedCurrenciesValues>>([]);
  const { name, capital, latlng, population, currencies } = useSelector(
    (state: IRootState) => state.map.countryData
  );
  const allRates = useSelector(
    (state: IRootState) => state.converter.rate?.rates
  );

  useEffect(() => {
    setExistedCurrs(() => isCurrencyExist(allRates, currencies));
  }, [allRates, currencies]);

  const ChangeView = ({ center, zoom }: TView) => {
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
              {t('countryName')} {name}
              <br />
              {t('capital')} {capital}
              <br />
							{t('population')}  {population}
              <br />
              {t('currenciesToUSD')}{' '}
              {existedCurrencies.length
                ? existedCurrencies.map((el) => `${el.currency} - ${el.value}`)
                : 'unknowed'}
            </span>
          </Tooltip>
        </Marker>
      ) : null}
    </Map>
  );
};

export default MapContent;
