import { FC, useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import {
  getCountryInfoFromAPI,
  getCountriesNameByCodesFromAPI,
  CountryDataInfo,
} from '../../api/api';
import {
  InfoItem,
  ArrowIcon,
  Loader,
  NoData,
} from '../../components';

import imgBlank from '../../images/file-image-regular.svg';

import styles from './CountryInfoPage.module.css';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};
interface CountryInfoPageProps {
  setErrorMessage: (message: string) => void,
}

const CountryInfoPage: FC<CountryInfoPageProps> = ({
  setErrorMessage,
}) => {
  const [countryInfo, setCountryInfo] = useState<CountryDataInfo>();
  const [prevCountryName, setPrevCountryName] = useState<string>('');
  const [borderCountriesNames, setBorderCountriesNames] = useState<string[]>([]);
  const [isFetchingCountryInfoData, setIsFetchingCountryInfoData] = useState<boolean>(false);
  const { countryName } = useParams();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    scrollToTop();

    if (!countryName || prevCountryName === countryName) {
      return;
    }

    async function getCountryInfo() {
      if (countryName) {
        try {
          setIsFetchingCountryInfoData(true);

          const response = await getCountryInfoFromAPI(countryName);

          setCountryInfo(response[0]);
          setPrevCountryName(countryName);
        } catch (error) {
          if (prevCountryName) {
            navigate(`/${prevCountryName}`);
          }

          setErrorMessage(`${error}.`);
        } finally {
          setIsFetchingCountryInfoData(false);
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
                    : <span>{countryInfo.borders.length ? 'No data' : 'There are no border countries'}</span>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
        : isFetchingCountryInfoData
          ? <Loader/>
          : <NoData/>
      }
    </>
  );
};

export default CountryInfoPage;
