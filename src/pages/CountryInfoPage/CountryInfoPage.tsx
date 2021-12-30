import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  getCountryInfoFromAPI,
  getCountriesNameByCodesFromAPI,
  CountryDataInfo,
} from '../../api/api';

import {
  InfoItem,
  SnackBar,
  ArrowIcon,
} from '../../components';

import imgBlank from '../../images/file-image-regular.svg';

import styles from './CountryInfoPage.module.css';

interface CountryInfoPageProps {}

const CountryInfoPage: FC<CountryInfoPageProps> = () => {
  const [countryInfo, setCountryInfo] = useState<CountryDataInfo>();
  const [borderCountriesNames, setBorderCountriesNames] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { countryName } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (!countryName) {
      return;
    }

    async function getCountryInfo() {
      if (!countryName) {
        return;
      }

      try {
        const response = await getCountryInfoFromAPI(countryName);

        setCountryInfo(response[0]);
      } catch (error) {
        setErrorMessage(`${error}.`);
        console.log(error);
      }
    }

    getCountryInfo();
  }, [countryName]);

  useEffect(() => {
    if (!countryInfo?.borders.length) {
      return;
    }

    async function getCountriesNameByCodes() {
      if (!countryInfo) {
        return;
      }

      try {
        const response = await getCountriesNameByCodesFromAPI(countryInfo.borders);

        setBorderCountriesNames(response.map(object => object.name));
      } catch (error) {
        setErrorMessage(`${error}.`);
      }
    }

    getCountriesNameByCodes();
  }, [countryInfo]);

  return (
    !countryInfo
      ? <h2 className={styles.noDataTitle}>No data :(</h2>
      : <>
        <div className={styles.countryInfoControlsWrapper}>
          <button
            className={styles.goBackBtn}
            onClick={goBack}
          >
            <ArrowIcon
              width={16}
              height={16}
              color='currentColor'
            />
            <span>Back</span>
          </button>
        </div>
        <div className={styles.countryInfoWrapper}>
          <div
            className={styles.flagWrapper}
            style={{ background: `var(--clr-ui) url(${imgBlank}) center / 20% no-repeat` }}
          >
            <img
              className={styles.flagImg}
              src={countryInfo.flags.svg}
              alt={`The flag of ${countryInfo.name}`}
              loading='lazy'
            />
          </div>
          <div className={styles.countryInfoContentWrapper}>
            <h2 className={styles.countryName}>{countryInfo.name}</h2>
            <div className={styles.infoWrapper}>
              <InfoItem
                title='native name'
                value={countryInfo.nativeName}
              />
              <InfoItem
                title='population'
                value={countryInfo.population}
              />
              <InfoItem
                title='region'
                value={countryInfo.region}
              />
              <InfoItem
                title='sub region'
                value={countryInfo.subregion}
              />
              <InfoItem
                title='capital'
                value={countryInfo.capital}
              />
              <InfoItem
                title='top level domain'
                value={countryInfo.topLevelDomain.join(', ')}
              />
              <InfoItem
                title='currencies'
                value={countryInfo.currencies.map(currency => currency.name).join(', ')}
              />
              <InfoItem
                title='languages'
                value={countryInfo.languages.map(language => language.name).join(', ')}
              />
            </div>
            <div className={styles.borderCountriesNamesWrapper}>
              <h3 className={styles.borderCountriesTitle}>Border Countries:</h3>
              <div className={styles.borderCountriesLinksWrapper}>
                {borderCountriesNames.length
                  ? borderCountriesNames.map(name => {
                    return (
                      <Link
                        key={name}
                        className={styles.borderCountryLink}
                        to={`/${name}`}
                      >
                        {name}
                      </Link>
                    );
                  })
                  : <span>There are no border countries</span>
                }
              </div>
            </div>
          </div>
        </div>
        <SnackBar
          message={errorMessage}
          duration={7000}
          clearMsg={() => setErrorMessage('')}
        />
      </>
  );
};

export default CountryInfoPage;
