import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { RoutesEnum } from '../types';
import { CountriesListPage, CountryInfoPage } from '../pages';

interface AppRouterProps {}

export const AppRouter: FC<AppRouterProps> = () => {
  return (
    <Routes>
      <Route
        path={RoutesEnum.COUNTRIESLIST}
        element={<CountriesListPage />}
      />
      <Route
        path={RoutesEnum.CONTRYINFO}
        element={<CountryInfoPage />}
      />
      <Route
        path='*'
        element={<Navigate to={RoutesEnum.REDIRECTPATH} />}
      />
    </Routes>
  );
};
