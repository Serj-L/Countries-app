/* eslint-disable no-restricted-globals */
import { FC, useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  getCountryInfoFromAPI,
  getCountriesNameByCodesFromAPI,
  ICountryDataInfo,
} from '../../api/api';
import { AppContext } from '../../App';

import {
  InfoItem,
  ArrowIcon,
  Loader,
  NoData,
} from '../../components';

import imgBlank from '../../images/file-image-regular.svg';

import styles from './CountryInfoPage.module.css';

interface CountryInfoPageProps {}

const CountryInfoPage: FC<CountryInfoPageProps> = () => {
  const { setErrorMessage } = useContext(AppContext);
  const [countryInfo, setCountryInfo] = useState<ICountryDataInfo>();
  const [prevCountryName, setPrevCountryName] = useState<string>('');
  const [borderCountriesNames, setBorderCountriesNames] = useState<string[]>([]);
  const [isFetchingCountryInfo, setIsFetchingCountryInfo] = useState<boolean>(true);
  const { countryName } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (document.documentElement.scrollTop) {
      document.documentElement.scrollTo(0, 0);
    }

    if (!countryName || prevCountryName === countryName) {
      return;
    }

    async function getCountryInfo() {
      if (countryName) {
        try {
          if (!isFetchingCountryInfo) {
            setIsFetchingCountryInfo(true);
          }

          const response = await getCountryInfoFromAPI(countryName);

          setCountryInfo(response[0]);
          setPrevCountryName(countryName);
        } catch (error) {
          if (prevCountryName) {
            navigate(`/${prevCountryName}`);
          }

          setErrorMessage(`${error}.`);
        } finally {
          setIsFetchingCountryInfo(false);
        }
      }
    }

    getCountryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryName]);

  useEffect(() => {
    if (!countryInfo?.borders.length) {
      if (borderCountriesNames.length) {
        borderCountriesNames.length = 0;
      }
      return;
    }

    async function getCountriesNameByCodes() {
      if (countryInfo) {
        try {
          const response = await getCountriesNameByCodesFromAPI(countryInfo.borders);

          setBorderCountriesNames(response.map(object => object.name));
        } catch (error) {
          setErrorMessage(`${error}.`);
          borderCountriesNames.length = 0;
        }
      }
    }

    getCountriesNameByCodes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryInfo]);

  return (
    <>
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
      {countryInfo
        ? <>
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
                  value={countryInfo.topLevelDomain?.join(', ')}
                />
                <InfoItem
                  title='currencies'
                  value={countryInfo.currencies?.map(currency => currency.name)?.join(', ')}
                />
                <InfoItem
                  title='languages'
                  value={countryInfo.languages?.map(language => language.name)?.join(', ')}
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
                    : <span className={styles.noBordersInfo}>{countryInfo.borders.length ? 'No data' : 'There are no border countries'}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
        : isFetchingCountryInfo
          ? <Loader/>
          : <NoData/>
      }
    </>
  );
};

export default CountryInfoPage;
