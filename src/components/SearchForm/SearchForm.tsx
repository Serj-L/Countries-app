import { FC, useState, FormEvent } from 'react';

import { SearchIcon, CrossIcon } from '..';

import styles from './SearchForm.module.css';

interface SearchFormProps {
  placeholder?: string,
  onSubmit: (event: FormEvent) => void,
  onReset: () => void,
}

const SearchForm: FC<SearchFormProps> = ({
  placeholder = 'Type search request here...',
  onSubmit,
  onReset,
}) => {
  const [isClearBtnDisabled, setIsClearBtnDisabled] = useState<boolean>(true);

  const onChangeHandler = (value: string) => {
    value ? setIsClearBtnDisabled(false) : setIsClearBtnDisabled(true);
  };
  const onResetHandler = () => {
    setIsClearBtnDisabled(true);
    onReset();
  };

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
        onChange={event => onChangeHandler(event.currentTarget.value)}
      />
      <button
        className={styles.clearSearchBtn}
        type='reset'
        disabled={isClearBtnDisabled}
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
