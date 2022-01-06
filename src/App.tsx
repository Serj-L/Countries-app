import { useState, useEffect, createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  getAllCountriesFromAPI,
  getCountriesByNameSearchFromAPI,
  getAllCountriesByRegionFilterFromAPI,
  ICountryDataList,
} from './api/api';
import {
  LocalStorageKeys,
  ThemeTypes,
  RoutesEnum,
  RegionFilterOptions,
} from './types';
import { AppRouter } from './router';

import {
  ThemeSwitcher,
  Loader,
  NoData,
  SnackBar,
} from './components';

import styles from './App.module.css';

interface IAppContext {
  countriesList: ICountryDataList[],
  setCountriesList: (list: ICountryDataList[]) => void,
  setErrorMessage: (message: string) => void,
}

export const AppContext = createContext<IAppContext>({
  countriesList: [],
  setCountriesList: () => {},
  setErrorMessage: () => {},
});

function App() {
  const [themeType, setThemeType] = useState<ThemeTypes>(localStorage.getItem(LocalStorageKeys.THEMETYPE) as ThemeTypes || ThemeTypes.LIGHT);
  const [countriesList, setCountriesList] = useState<ICountryDataList[]>([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleThemeType = () => {
    if (themeType === ThemeTypes.LIGHT) {
      setThemeType(ThemeTypes.DARK);
      localStorage.setItem(LocalStorageKeys.THEMETYPE, ThemeTypes.DARK);
    } else {
      setThemeType(ThemeTypes.LIGHT);
      localStorage.setItem(LocalStorageKeys.THEMETYPE, ThemeTypes.LIGHT);
    }
  };
  const navigateHome = () => {
    if (pathname === RoutesEnum.COUNTRIESLIST) {
      return;
    }
    navigate(RoutesEnum.COUNTRIESLIST);
  };

  useEffect(() => {
    async function getCountriesList() {
      try {
        const filterValue = localStorage.getItem(LocalStorageKeys.FILTERVALUE) || RegionFilterOptions.ALLREGIONS;
        const searchValue = localStorage.getItem(LocalStorageKeys.SEARCHVALUE) || '';

        if (!isFetchingData) {
          setIsFetchingData(true);
        }

        const response = filterValue === RegionFilterOptions.ALLREGIONS && !searchValue
          ? await getAllCountriesFromAPI()
          : searchValue
            ? await getCountriesByNameSearchFromAPI(searchValue)
            : await getAllCountriesByRegionFilterFromAPI(filterValue);

        setCountriesList(response);
      } catch (error) {
        setErrorMessage(`${error}.`);
      } finally {
        setIsFetchingData(false);
      }
    }

    getCountriesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider value={{ countriesList, setCountriesList, setErrorMessage }}>
      <div
        className={styles.App}
        data-theme-type={themeType}
      >
        <header className={styles.header}>
          <div className={styles.headerContainer}>
            <h1
              className={styles.headerTitle}
              onClick={navigateHome}
            >
            Where in the World?
            </h1>
            <ThemeSwitcher
              themeType={themeType}
              onClickHandler={toggleThemeType}
            />
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.mainContainer}>
            {countriesList.length
              ? <AppRouter />
              : isFetchingData
                ? <Loader paddingTop={60} />
                : <NoData/>
            }
          </div>
        </main>
        <SnackBar
          message={errorMessage}
          duration={7000}
          clearMsg={() => setErrorMessage('')}
        />
      </div>
    </AppContext.Provider>
  );
}

export default App;
