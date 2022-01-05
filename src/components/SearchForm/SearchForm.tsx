import { FC, useState, useEffect, FormEvent } from 'react';

import { SearchIcon, CrossIcon } from '..';

import styles from './SearchForm.module.css';

interface SearchFormProps {
  placeholder?: string,
  actualSearchValue: string,
  isChangeSearchInputValue: boolean,
  isSearching: boolean,
  onSubmit: (value: string) => void,
}

const detectTouchDevice = (): boolean => {
  const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', 'i');

  return devices.test(navigator.userAgent);
};

const SearchForm: FC<SearchFormProps> = ({
  placeholder = 'Type search request here...',
  actualSearchValue,
  isChangeSearchInputValue,
  isSearching,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeHandler = (value: string) => {
    setInputValue(value);
  };
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (detectTouchDevice()) {
      const form = event.target as HTMLFormElement;
      const input = form[0] as HTMLInputElement;

      input.blur();
    }

    onSubmit(inputValue.trim());
  };
  const onResetHandler = () => {
    onSubmit('');
  };

  useEffect(() => {
    if (!isChangeSearchInputValue) {
      return;
    }
    setInputValue(actualSearchValue);
  }, [actualSearchValue, isChangeSearchInputValue]);

  return (
    <form
      className={styles.SearchForm}
      onSubmit={(event) => onSubmitHandler(event)}
      onReset={onResetHandler}
    >
      <div className={styles.searchIconWrapper}>
        {isSearching
          ? <div
            className={styles.loader}
            style={{ width: 20, height: 20 }}
          >
            <div className={styles.circleOne}></div>
            <div className={styles.circleTwo}></div>
          </div>
          : <SearchIcon
            width={20}
            height={20}
            color='currentColor'
          />
        }
      </div>
      <input
        className={styles.searchInput}
        type="text"
        placeholder={placeholder}
        name='searchValue'
        autoComplete='off'
        value={inputValue}
        onChange={event => onChangeHandler(event.currentTarget.value)}
      />
      <button
        title='Reset or clear search request'
        className={styles.clearSearchBtn}
        type='reset'
        disabled={!inputValue}
      >
        <CrossIcon
          width={20}
          height={20}
          color='currentColor'
        />
      </button>
    </form>
  );
};

export default SearchForm;
