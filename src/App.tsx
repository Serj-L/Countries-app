import { useState } from 'react';

import { LocalStorageKeys, ThemeTypes } from './types';
import { AppRouter } from './router';
import { ThemeSwitcher } from './components';

import styles from './App.module.css';

function App() {
  const [themeType, setThemeType] = useState<ThemeTypes>(localStorage.getItem(LocalStorageKeys.THEMETYPE) as ThemeTypes || ThemeTypes.LIGHT);

  const toggleThemeType = () => {
    if (themeType === ThemeTypes.LIGHT) {
      setThemeType(ThemeTypes.DARK);
      localStorage.setItem(LocalStorageKeys.THEMETYPE, ThemeTypes.DARK);
    } else {
      setThemeType(ThemeTypes.LIGHT);
      localStorage.setItem(LocalStorageKeys.THEMETYPE, ThemeTypes.LIGHT);
    }
  };

  return (
    <div
      className={styles.App}
      data-theme-type={themeType}
    >
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>Where in the World?</h1>
          <ThemeSwitcher
            themeType={themeType}
            onClickHandler={toggleThemeType}
          />
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainControls}>

        </div>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
