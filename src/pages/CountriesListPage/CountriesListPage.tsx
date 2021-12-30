import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAllCountriesFromAPI,
  CountryDataList,
  getCountriesByNameSearchFromAPI,
  getAllCountriesByRegionFilterFromAPI,
} from '../../api/api';
import { LocalStorageKeys, RegionFilterOptions } from '../../types';

import {
  Card,
  SearchForm,
  Filter,
  SnackBar,
  ScrollTop,
} from '../../components';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const filterOptions: string[] = Object.values(RegionFilterOptions).filter(option => option !== RegionFilterOptions.ALLREGIONS);

const CountriesListPage: FC<CountriesListPageProps> = () => {
  const [countriesList, setCountriesList] = useState<CountryDataList[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>(localStorage.getItem(LocalStorageKeys.FILTERVALUE) || RegionFilterOptions.ALLREGIONS);
  const navigate = useNavigate();

  const onSearch = async (value: string) => {
    if (!value && !searchValue) {
      return;
    }
    if (value === searchValue) {
      setErrorMessage('The current search request is the same as the previous one, please edit your request.');
      return;
    }

    try {
      const response = value
        ? await getCountriesByNameSearchFromAPI(value)
        : await getAllCountriesFromAPI();

      if (Array.isArray(response)) {
        setCountriesList(response);
        setSearchValue(value);

        if (filterValue !== RegionFilterOptions.ALLREGIONS) {
          setFilterValue(RegionFilterOptions.ALLREGIONS);
          localStorage.setItem(LocalStorageKeys.FILTERVALUE, RegionFilterOptions.ALLREGIONS);
        }
      } else {
        setErrorMessage('Country not found, please edit your search request.');
      }
    } catch (error) {
      setErrorMessage(`${error}.`);
    }
  };
  const onFilter = async (value: string) => {
    try {
      const response = value === RegionFilterOptions.ALLREGIONS
        ? await getAllCountriesFromAPI()
        : await getAllCountriesByRegionFilterFromAPI(value);

      setCountriesList(response);
      setFilterValue(value);
      localStorage.setItem(LocalStorageKeys.FILTERVALUE, value);
      if (searchValue) {
        setSearchValue('');
      }
    } catch (error) {
      setErrorMessage(`${error}.`);
    }
  };

  useEffect(() => {
    async function getCountriesList() {
      try {
        const response = filterValue === RegionFilterOptions.ALLREGIONS
          ? await getAllCountriesFromAPI()
          : await getAllCountriesByRegionFilterFromAPI(filterValue);

        setCountriesList(response);
      } catch (error) {
        setErrorMessage(`${error}.`);
      }
    }

    getCountriesList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.countriesListControls}>
        <SearchForm
          placeholder='Search for a country...'
          actualSearchValue={searchValue}
          isError={!!errorMessage}
          onSubmit={onSearch}
        />
        <Filter
          placeholder='Filter By Region'
          allValuesPlaceholder={RegionFilterOptions.ALLREGIONS}
          optionsList={filterOptions}
          selectedValue={filterValue}
          onChange={onFilter}
        />
      </div>
      {countriesList.length
        ? <ul className={styles.countriesList}>
          {
            countriesList.map(country => {
              return (
                <li
                  key={country.name}
                  className={styles.countriesListItem}
                >
                  <Card
                    countryData={country}
                    onClickHandler={() => navigate(`/${country.name}`)}
                  />
                </li>
              );
            })
          }
        </ul>
        : <h2 className={styles.noDataTitle}>No data :(</h2>
      }

      <ScrollTop
        triggerTopOffSet={350}
      />

      <SnackBar
        message={errorMessage}
        duration={7000}
        clearMsg={() => setErrorMessage('')}
      />
    </>
  );
};

export default CountriesListPage;
