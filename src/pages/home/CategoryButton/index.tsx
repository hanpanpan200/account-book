import React, { useMemo } from 'react';
import { Category } from 'types/bill';
import allIcon from 'assets/icons/all.svg';
import styles from './index.module.scss';

interface Props {
  category?: Category
  onClick: () => void
}

const CategoryButton:React.FC<Props> = ({ category, onClick }) => {
  const categoryLabel = useMemo(() => category?.name || '全部类型', [category?.name])

  return (
    <div className={styles.container} onClick={onClick}>
      <span>{categoryLabel}</span>
      <span className={styles.splitter}>|</span>
      <img src={allIcon} alt='allIcon' />
    </div>
  )
}

export default CategoryButton;