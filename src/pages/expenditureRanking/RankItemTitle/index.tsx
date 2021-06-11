import React from 'react';

import styles from './index.module.scss';

interface Props {
  title: string
  label: string
}

const RankItemTitle: React.FC<Props> = ({ title, label }) => {
  return (
    <div className={styles.container}>
      <span>{title}</span>
      <span className={styles.label}>{label}</span>
    </div>
  )
};

export default RankItemTitle;
