import { FC } from 'react';

import { CountryDataList } from '../../api/api';

import { InfoItem } from '..';

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
      tabIndex={0}
      onClick={onClickHandler}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onClickHandler();
        }
      }}
    >
      <div
        className={styles.flagWrapper}
        style={{ background: `var(--clr-ui) url(${imgBlank}) center / 20% no-repeat` }}
      >
        <img
          className={styles.flagImg}
          src={countryData.flags.svg}
          alt={`The flag of ${countryData.name}`}
          loading='lazy'
        />
      </div>
      <div className={styles.countryInfoWrapper}>
        <h2 className={styles.countryName}>{countryData.name}</h2>
        <InfoItem
          title='population'
          value={countryData.population}
        />
        <InfoItem
          title='region'
          value={countryData.region}
        />
        <InfoItem
          title='capital'
          value={countryData.capital}
        />
      </div>
    </div>
  );
};

export default Card;
