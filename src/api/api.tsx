import axios from 'axios';

export interface ICountryName {
  name: string,
}

export interface ICountryDataList extends ICountryName {
  population: number,
  region: string,
  capital: string,
  flags: {png: string, svg: string},
}

export interface ICountryDataInfo extends ICountryDataList {
  nativeName: string,
  subregion: string,
  topLevelDomain: string[],
  currencies: {code: string, name: string, symbol: string}[],
  languages: {iso639_1: string, iso639_2: string, name: string, nativeName: string}[],
  borders: string[],
}

const BASE_API_URL: string = 'https://restcountries.com/v2/';
const FIELDS_COUNTRIES_LIST: string[] = ['name', 'population', 'region', 'capital', 'flags'];
const FIELDS_COUNTRY_INFO: string[] = ['name', 'nativeName', 'population', 'region', 'subregion', 'capital', 'topLevelDomain', 'currencies', 'languages', 'flags', 'borders'];
const FIELDS_BORDER_COUNTRIES_LIST: string[] = ['name'];

export const getAllCountriesFromAPI = async (): Promise<ICountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}all?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getAllCountriesByRegionFilterFromAPI = async (region: string): Promise<ICountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}region/${region.toLowerCase()}?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountriesByNameSearchFromAPI = async (name: string): Promise<ICountryDataList[]> => {
  const response = await axios.get(`${BASE_API_URL}name/${name}?fields=name,${FIELDS_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountryInfoFromAPI = async (name: string): Promise<ICountryDataInfo[]> => {
  const response = await axios.get(`${BASE_API_URL}name/${name}?fullText=true&fields=name,${FIELDS_COUNTRY_INFO.join(',')}`);
  const data = await response.data;

  return data;
};

export const getCountriesNameByCodesFromAPI = async (codes: string[]): Promise<ICountryName[]> => {
  const response = await axios.get(`https://restcountries.com/v2/alpha?codes=${codes.join(',')}&fields=name,${FIELDS_BORDER_COUNTRIES_LIST.join(',')}`);
  const data = await response.data;

  return data;
};
