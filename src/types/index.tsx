/* eslint-disable no-unused-vars */
export enum ThemeTypes {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum RoutesEnum {
  COUNTRIESLIST = '/',
  CONTRYINFO = ':countryName',
  REDIRECTPATH = '/',
}

export enum LocalStorageKeys {
  THEMETYPE = 'ContriesAppThemeType',
  FILTERVALUE = 'ContriesAppFilterValue',
  SEARCHVALUE = 'ContriesAppSearchValue',
}

export enum RegionFilterOptions {
  ALLREGIONS = 'All regions',
  AFRICA = 'Africa',
  AMERICA = 'Americas',
  ASIA = 'Asia',
  EUROPE = 'Europe',
  OCEANIA = 'Oceania',
}
