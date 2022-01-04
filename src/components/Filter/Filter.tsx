import { FC } from 'react';

import styles from './Filter.module.css';

interface FilterProps {
  placeholder: string,
  allValuesPlaceholder: string,
  optionsList: string[],
  selectedValue: string,
  isFiltering: boolean,
  onChange: (value: string) => void,
}

const Filter: FC<FilterProps> = ({
  placeholder,
  allValuesPlaceholder,
  optionsList,
  selectedValue,
  isFiltering,
  onChange,
}) => {
  return (
    <div className={styles.filterWrapper}>
      {isFiltering && <div className={styles.filterLoader}>
        <div className={styles.circleOne}></div>
        <div className={styles.circleTwo}></div>
        <div className={styles.circleThree}></div>
      </div>
      }
      <select
        className={styles.filterSelect}
        onChange={event => onChange(event.target.value)}
        value={selectedValue === allValuesPlaceholder ? 'placeholder' : selectedValue}
      >
        <option
          value='placeholder'
          disabled
        >
          {placeholder}
        </option>
        <option
          value={allValuesPlaceholder}
        >
          {allValuesPlaceholder}
        </option>
        {
          Array.from(new Set(optionsList)).map(option => {
            return (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};

export default Filter;
