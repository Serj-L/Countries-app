import { FC } from 'react';

import styles from './Filter.module.css';

interface FilterProps {
  placeholder: string,
  allValuesPlaceholder: string,
  optionsList: string[],
  selectedValue: string,
  onChange: (value: string) => void,
}

const Filter: FC<FilterProps> = ({
  placeholder,
  allValuesPlaceholder,
  optionsList,
  selectedValue,
  onChange,
}) => {
  return (
    <div className={styles.filterWrapper}>
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
