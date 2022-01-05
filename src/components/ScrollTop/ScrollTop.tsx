import { FC, useState, useEffect } from 'react';

import styles from './ScrollTop.module.css';

interface ScrollTopProps {
  triggerTopOffSet: number,
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ScrollTop: FC<ScrollTopProps> = ({ triggerTopOffSet }) => {
  const [isScrollingDown, setScrollingDown] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      setScrollingDown(document.documentElement.scrollTop > triggerTopOffSet);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.scrollTop}
      data-is-visible={isScrollingDown}
    >
      <button
        className={styles.scrollTopBtn}
        onClick = {scrollToTop}
      >
        <svg
          aria-hidden='true'
          focusable='false'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
          width='1.2em'
          height='1.2em'
        >
          <path
            fill='currentColor'
            d='M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z'></path></svg>
      </button>
    </div>
  );
};

export default ScrollTop;
