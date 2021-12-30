import { FC } from 'react';

import { ThemeTypes } from '../../types';
import { MoonIcon } from '../../components';

import styles from './ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  themeType: ThemeTypes,
  onClickHandler: () => void;
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  themeType,
  onClickHandler,
}) => {
  return (
    <div
      className={styles.themeSwitcherWrapper}
      onClick={onClickHandler}
    >
      <div className={styles.themeSwitcherIconWrapper}>
        <MoonIcon
          width={18}
          height={18}
          color='CurrentColor'
          isFilled={themeType === ThemeTypes.DARK}
        />
      </div>
      <span className={styles.themeType}>{themeType[0].toUpperCase() + themeType.substring(1) + ' Mode'}</span>
    </div>
  );
};

export default ThemeSwitcher;
