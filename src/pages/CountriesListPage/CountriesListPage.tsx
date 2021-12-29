import { FC, FormEvent, useEffect, useState } from 'react';

import {
  getAllCountriesFromAPI,
  CountryDataList,
  getCountriesByNameSearchFromAPI,
  getAllCountriesByRegionFilterFromAPI,
} from '../../api/api';
import { LocalStorageKeys, RegionFilterOptions } from '../../types';

import { Card, SearchForm, Filter, SnackBar } from '../../components';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const filterOptions: string[] = Object.values(RegionFilterOptions).filter(option => option !== RegionFilterOptions.ALLREGIONS);

const CountriesListPage: FC<CountriesListPageProps> = () => {
  const [countriesList, setCountriesList] = useState<CountryDataList[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>(localStorage.getItem(LocalStorageKeys.FILTERVALUE) || RegionFilterOptions.ALLREGIONS);

  const onSearch = (event: FormEvent) => {
    const form = event.target as HTMLFormElement;
    const input = form[0] as HTMLInputElement;
    const searchValue: string = input.value.trim();

    event.preventDefault();
    setSearchValue(searchValue);
    setFilterValue(RegionFilterOptions.ALLREGIONS);
    localStorage.setItem(LocalStorageKeys.FILTERVALUE, RegionFilterOptions.ALLREGIONS);
  };
  const onResetSearch = () => {
    setSearchValue('');
  };
  const onFilter = (value: string) => {
    setFilterValue(value);
    localStorage.setItem(LocalStorageKeys.FILTERVALUE, value);
    setSearchValue('');
  };

  useEffect(() => {
    async function getAllCountries() {
      try {
        const response = await getAllCountriesFromAPI();
        setCountriesList(response);
      } catch (error) {
        setErrorMessage(`${error}.`);
      }
    }
    async function getCountriesByNameSearch() {
      try {
        const response = await getCountriesByNameSearchFromAPI(searchValue);

        if (Array.isArray(response)) {
          setCountriesList(response);
        } else {
          setErrorMessage('Country not found, please check your search request.');
        }
      } catch (error) {
        setErrorMessage(`${error}.`);
      }
    }
    async function getAllCountriesByRegionFilter() {
      try {
        const response = await getAllCountriesByRegionFilterFromAPI(filterValue);
        setCountriesList(response);
      } catch (error) {
        setErrorMessage(`${error}.`);
      }
    }

    if (searchValue) {
      getCountriesByNameSearch();
    } else {
      filterValue === RegionFilterOptions.ALLREGIONS
        ? getAllCountries()
        : getAllCountriesByRegionFilter();
    }
  }, [searchValue, filterValue]);

  return (
    <>
      <div className={styles.countriesListControls}>
        <SearchForm
          placeholder='Search for a country...'
          submitedValue={searchValue}
          onSubmit={onSearch}
          onReset={onResetSearch}
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
                    onClickHandler={() => console.log(country.name)}
                  />
                </li>
              );
            })
          }
        </ul>
        : <h2>No data</h2>
      }
      <SnackBar
        message={errorMessage}
        duration={7000}
        clearMsg={() => setErrorMessage('')}
      />
    </>
  );
};

export default CountriesListPage;
