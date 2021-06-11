import React from 'react';

import styles from './index.module.scss';

interface Props {
  percentage: number
}

const ProgressBar:React.FC<Props> = ({ percentage }) => {
  return (
    <div className={styles.container}>
      <div style={{ width: `${percentage}%` }} />
    </div>
  )
}

export default ProgressBar;