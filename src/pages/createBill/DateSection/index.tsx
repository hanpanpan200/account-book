import React from 'react';
import { useFullDate } from '../hooks';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

import styles from './index.module.scss';

interface Props {
  date: Date
  onClick: () => void
}

const DateSection: React.FC<Props> = ({ date, onClick }) => {
  const fullDate = useFullDate(date);

  return (
    <div className={styles.container} onClick={onClick}>
      <label>{fullDate}</label>
      <img src={arrowRightIcon} alt='arrowRightIcon' />
    </div>
  )
};

export default DateSection;
