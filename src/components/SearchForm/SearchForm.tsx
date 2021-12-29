import { FC, useState, useEffect, FormEvent } from 'react';

import { SearchIcon, CrossIcon } from '..';

import styles from './SearchForm.module.css';

interface SearchFormProps {
  placeholder?: string,
  submitedValue: string,
  onSubmit: (event: FormEvent) => void,
  onReset: () => void,
}

const SearchForm: FC<SearchFormProps> = ({
  placeholder = 'Type search request here...',
  submitedValue,
  onSubmit,
  onReset,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChangeHandler = (value: string) => {
    setInputValue(value);
  };
  const onResetHandler = () => {
    setInputValue('');
    onReset();
  };

  useEffect(() => {
    setInputValue(submitedValue);
  }, [submitedValue]);

  return (
    <form
      className={styles.SearchFormForm}
      onSubmit={event => onSubmit(event)}
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
