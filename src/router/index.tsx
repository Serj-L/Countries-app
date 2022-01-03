import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { CountryDataList } from '../api/api';
import { RoutesEnum } from '../types';
import { CountriesListPage, CountryInfoPage } from '../pages';

interface AppRouterProps {
  countriesList: CountryDataList[],
  setCountriesList: (countriesList: CountryDataList[]) => void,
  setErrorMessage: (message: string) => void,
}

export const AppRouter: FC<AppRouterProps> = ( {
  countriesList,
  setCountriesList,
  setErrorMessage,
} ) => {
  return (
    <Routes>
      <Route
        path={RoutesEnum.COUNTRIESLIST}
        element={<CountriesListPage
          countriesList={countriesList}
          setCountriesList={setCountriesList}
          setErrorMessage={setErrorMessage}
        />}
      />
      <Route
        path={RoutesEnum.CONTRYINFO}
        element={<CountryInfoPage
          setErrorMessage={setErrorMessage}
        />}
      />
      <Route
        path='*'
        element={<Navigate to={RoutesEnum.REDIRECTPATH} />}
      />
    </Routes>
  );
};
