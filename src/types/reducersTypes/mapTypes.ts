export interface ICountryData{
	name: string,
	latlng: number[],
	population: number,
	capital: string,
}

export interface IMapState {
  matchedValues: string[];
  countryList: string[];
  countryData: ICountryData;
}
