import { FC } from 'react';

import { CountryDataList } from '../../api/api';

import imgBlank from '../../images/file-image-regular.svg';

import styles from './Card.module.css';

interface CardProps {
  countryData: CountryDataList
  onClickHandler: () => void;
}

const Card: FC<CardProps> = ({
  countryData,
  onClickHandler,
}) => {
  return (
    <div
      className={styles.cardContainer}
      tabIndex={1}
      onClick={onClickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClickHandler();
        }
      }}
    >
      <div
        className={styles.flag}
        style={{ background: `url(${countryData.flags.svg}) center left / cover no-repeat, var(--clr-ui) url(${imgBlank}) center / 20% no-repeat ` }}
      >

      </div>
      <div className={styles.countryInfoWrapper}>
        <h2 className={styles.countryName}>{countryData.name}</h2>
        <p className={styles.countryInfoTitle}>Population: <span className={styles.countryInfoValue}>{countryData.population.toLocaleString('en-EN') || 'n/a'}</span></p>
        <p className={styles.countryInfoTitle}>Region: <span className={styles.countryInfoValue}>{countryData.region || 'n/a'}</span></p>
        <p className={styles.countryInfoTitle}>Capital: <span className={styles.countryInfoValue}>{countryData.capital || 'n/a'}</span></p>
      </div>
    </div>
  );
};

export default Card;
