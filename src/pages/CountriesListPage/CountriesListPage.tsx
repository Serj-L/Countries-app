import { FC, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  getAllCountriesFromAPI,
  getCountriesByNameSearchFromAPI,
  getAllCountriesByRegionFilterFromAPI,
} from '../../api/api';
import {
  LocalStorageKeys,
  RegionFilterOptions,
} from '../../types';
import { AppContext } from '../../App';

import {
  Card,
  SearchForm,
  Filter,
  ScrollTop,
} from '../../components';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const filterOptions: string[] = Object.values(RegionFilterOptions).filter(option => option !== RegionFilterOptions.ALLREGIONS);

const CountriesListPage: FC<CountriesListPageProps> = () => {
  const { countriesList, setCountriesList, setErrorMessage } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem(LocalStorageKeys.SEARCHVALUE) || '');
  const [isChangeSearchInputValue, setIsChangeSearchInputValue] = useState<boolean>(true);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>(localStorage.getItem(LocalStorageKeys.FILTERVALUE) || RegionFilterOptions.ALLREGIONS);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSearch = async (value: string) => {
    if (!value && !searchValue) {
      setIsChangeSearchInputValue(true);
      return;
    }
    if (value === searchValue) {
      setErrorMessage('The current search request is the same as the previous one, please edit your request.');
      return;
    }

    try {
      setIsSearching(true);

      const response = value
        ? await getCountriesByNameSearchFromAPI(value)
        : await getAllCountriesFromAPI();

      if (Array.isArray(response)) {
        setCountriesList(response);
        setSearchValue(value);
        localStorage.setItem(LocalStorageKeys.SEARCHVALUE, value);
        setIsChangeSearchInputValue(true);

        if (filterValue !== RegionFilterOptions.ALLREGIONS) {
          setFilterValue(RegionFilterOptions.ALLREGIONS);
          localStorage.setItem(LocalStorageKeys.FILTERVALUE, RegionFilterOptions.ALLREGIONS);
        }
      } else {
        setErrorMessage('Country not found, please edit your search request.');
      }
    } catch (error) {
      setErrorMessage(`${error}.`);
      setIsChangeSearchInputValue(true);
    } finally {
      setIsSearching(false);
    }
  };
  const onFilter = async (value: string) => {
    try {
      setIsFiltering(true);

      const response = value === RegionFilterOptions.ALLREGIONS
        ? await getAllCountriesFromAPI()
        : await getAllCountriesByRegionFilterFromAPI(value);

      setCountriesList(response);
      setFilterValue(value);
      localStorage.setItem(LocalStorageKeys.FILTERVALUE, value);
      if (searchValue) {
        setSearchValue('');
        localStorage.setItem(LocalStorageKeys.SEARCHVALUE, '');
        setIsChangeSearchInputValue(true);
      }
    } catch (error) {
      setErrorMessage(`${error}.`);
    } finally {
      setIsFiltering(false);
    }
  };

  useEffect(() => {
    if (!isChangeSearchInputValue) {
      return;
    }
    setTimeout(() => {
      setIsChangeSearchInputValue(false);
    }, 0);
  }, [isChangeSearchInputValue]);

  return (
    <>
      <div className={styles.countriesListControls}>
        <SearchForm
          placeholder='Search for a country...'
          actualSearchValue={searchValue}
          isChangeSearchInputValue={isChangeSearchInputValue}
          isSearching={isSearching}
          onSubmit={onSearch}
        />
        <Filter
          placeholder='Filter By Region'
          allValuesPlaceholder={RegionFilterOptions.ALLREGIONS}
          optionsList={filterOptions}
          selectedValue={filterValue}
          isFiltering={isFiltering}
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
                  onClickHandler={() => navigate(`/${country.name}`)}
                />
              </li>
            );
          })
        }
      </ul>

      <ScrollTop
        triggerTopOffSet={350}
      />
    </>
  );
};

export default CountriesListPage;
