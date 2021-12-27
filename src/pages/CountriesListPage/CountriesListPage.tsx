import { FC, useEffect, useState } from 'react';

import { getAllCountriesFromAPI, CountryDataList } from '../../api/api';

import { Card } from '../../components';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const CountriesListPage: FC<CountriesListPageProps> = () => {
  const [countriesList, setCountriesList] = useState<CountryDataList[]>([]);
  useEffect(() => {
    async function getAllCountries() {
      try {
        const response = await getAllCountriesFromAPI();
        setCountriesList(response);
      } catch (error) {
        console.error(error);
      }
    }
    getAllCountries();
  }, []);
  return (
    <>
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
