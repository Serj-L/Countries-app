import { FC, FormEvent, useEffect, useState } from 'react';

import {
  getAllCountriesFromAPI,
  CountryDataList,
  getCountriesByNameSearchFromAPI,
  getAllCountriesByRegionFilterFromAPI,
} from '../../api/api';
import { LocalStorageKeys, RegionFilterOptions } from '../../types';

import { Card, SearchForm, Filter } from '../../components';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const filterOptions: string[] = Object.values(RegionFilterOptions).filter(option => option !== RegionFilterOptions.ALLREGIONS);

const CountriesListPage: FC<CountriesListPageProps> = () => {
  const [countriesList, setCountriesList] = useState<CountryDataList[]>([]);
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
        console.error(error);
      }
    }
    async function getCountriesByNameSearch() {
      try {
        const response = await getCountriesByNameSearchFromAPI(searchValue);
        setCountriesList(response);
      } catch (error) {
        console.error(error);
      }
    }
    async function getAllCountriesByRegionFilter() {
      try {
        const response = await getAllCountriesByRegionFilterFromAPI(filterValue);
        setCountriesList(response);
      } catch (error) {
        console.error(error);
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
      <ul className={styles.countriesList}>
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
    </>
  );
};

export default CountriesListPage;
