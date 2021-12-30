import { FC } from 'react';

import styles from './InfoItem.module.css';

interface InfoItemProps {
  title: string,
  isTitleCamelCase?: boolean,
  value: string | number,
}

const InfoItem: FC<InfoItemProps> = ({
  title,
  isTitleCamelCase = true,
  value,
}) => {
  const formatedTitle: string = isTitleCamelCase
    ? title.toLowerCase().split(' ').map(el => el[0].toUpperCase() + el.substring(1)).join(' ')
    : title[0].toUpperCase() + title.toLowerCase().substring(1);

  return (
    <>
      <p
        className={styles.countryInfoTitle}
      >
        {formatedTitle + ': '}
        <span
          className={styles.countryInfoValue}
        >
          {typeof value === 'number' ? value.toLocaleString('en-EN') : value || 'n/a'}
        </span>
      </p>
    </>
  );
};

export default InfoItem;
