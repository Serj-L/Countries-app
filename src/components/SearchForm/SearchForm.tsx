import { FC, useState, useEffect } from 'react';

import { SearchIcon, CrossIcon } from '..';

import styles from './SearchForm.module.css';

interface SearchFormProps {
  placeholder?: string,
  actualSearchValue: string,
  isError: boolean,
  onSubmit: (value: string) => void,
}

const SearchForm: FC<SearchFormProps> = ({
  placeholder = 'Type search request here...',
  actualSearchValue,
  isError,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeHandler = (value: string) => {
    setInputValue(value);
  };
  const onReset = () => {
    onSubmit('');
  };

  useEffect(() => {
    if (isError) {
      setInputValue(actualSearchValue);
    } else {
      setInputValue('');
    }
    setInputValue(actualSearchValue);
  }, [actualSearchValue, isError]);

  return (
    <form
      className={styles.SearchForm}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(inputValue.trim());
      }}
      onReset={onReset}
    >
      <div className={styles.searchIconWrapper}>
        <SearchIcon
          width={20}
          height={20}
          color='currentColor'
        />
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
