import React from 'react';
import emptyIcon from 'assets/icons/empty.svg';

import styles from './index.module.scss';

interface Props {
  guidance: string
}

const EmptyTips: React.FC<Props> = ({ guidance }) => {
  return (
    <div className={styles.container}>
      <img alt='emptyIcon' src={emptyIcon}/>
      <div>{guidance}</div>
    </div>
  )
};

export default EmptyTips;
