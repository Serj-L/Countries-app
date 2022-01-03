import { FC, useState, useEffect, FormEvent } from 'react';

import { SearchIcon, CrossIcon } from '..';

import styles from './SearchForm.module.css';

interface SearchFormProps {
  placeholder?: string,
  actualSearchValue: string,
  isChangeSearchInputValue: boolean,
  onSubmit: (value: string) => void,
}

const SearchForm: FC<SearchFormProps> = ({
  placeholder = 'Type search request here...',
  actualSearchValue,
  isChangeSearchInputValue,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeHandler = (value: string) => {
    setInputValue(value);
  };
  const onSubmitHandler = (event: FormEvent) => {
    event.preventDefault();
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
