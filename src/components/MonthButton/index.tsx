import React, { useMemo } from 'react';
import { getMonth, getYear } from 'utils/dateUtil';
import arrowDownIcon from 'assets/icons/arrow-down.svg';

import styles from './index.module.scss';

interface Props {
  date?: Date
  onClick: () => void
}

const MonthButton: React.FC<Props> = ({ date, onClick }) => {
  const monthLabel = useMemo(() => {
    const year = date ? getYear(date) : '-';
    const month = date ? getMonth(date) : '-';
    return `${year}年${month}月`;
  }, [date]);

  return (
    <div className={styles.container} onClick={onClick}>
      <span>{monthLabel}</span>
      <img src={arrowDownIcon} alt='arrowDownIcon' />
    </div>
  )
}

export default MonthButton;