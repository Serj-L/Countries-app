import axios from 'axios';

interface CountryName {
  name: string,
}

export interface CountryDataList extends CountryName {
  population: number,
  region: string,
  capital: string,
  flags: {png: string, svg: string},
}

export interface CountryDataInfo extends CountryDataList {
  nativeName: string,
  subregion: string,
  topLevelDomain: string[],
  currencies: {code: string, name: string, symbol: string},
  languages: {iso639_1: string, iso639_2: string, name: string, nativeName: string},
  borders: string[],
}

const BASE_API_URL: string = 'https://restcountries.com/v2/';
const FIELDS_COUNTRIES_LIST: string[] = ['name', 'population', 'region', 'capital', 'flags'];
const FIELDS_COUNTRY_INFO: string[] = ['name', 'nativeName', 'population', 'region', 'subregion', 'capital', 'topLevelDomain', 'currencies', 'languages', 'flags', 'borders'];
const FIELDS_BORDER_COUNTRIES_LIST: string[] = ['name'];

export const getAllCountriesFromAPI = async (): Promise<CountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}all?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getAllCountriesByRegionFilterFromAPI = async (region: string): Promise<CountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}region/${region.toLowerCase()}?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountriesByNameSearchFromAPI = async (name: string): Promise<CountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}name/${name}?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountryInfoFromAPI = async (name: string): Promise<CountryDataInfo[]> => {
  const response = await axios.get(`${BASE_API_URL}name/${name}?fullText=true?fields=name,${FIELDS_COUNTRY_INFO.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountriesNameByCodesFromAPI = async (codes: string[]): Promise<CountryName[]> => {
  const response = await axios.get(`https://restcountries.com/v2/alpha?codes=${codes.join(',')}?fields=name,${FIELDS_BORDER_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};
