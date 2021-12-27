import { FC } from 'react';

import styles from './CountryInfoPage.module.css';

interface CountryInfoPageProps {}

const CountryInfoPage: FC<CountryInfoPageProps> = () => {
  return (
    <>
      <h1 className={styles.title}>Country Info</h1>
    </>
  );
};

export default CountryInfoPage;
