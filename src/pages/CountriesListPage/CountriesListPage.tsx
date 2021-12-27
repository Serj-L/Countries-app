import { FC } from 'react';

import styles from './CountriesListPage.module.css';

interface CountriesListPageProps {}

const CountriesListPage: FC<CountriesListPageProps> = () => {
  return (
    <>
      <h1 className={styles.title}>Countries List Page</h1>
    </>
  );
};

export default CountriesListPage;
