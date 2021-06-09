import React from 'react';

import styles from './index.module.scss';

interface Props {
  title: string
  children: JSX.Element | JSX.Element[]
}

const Card:React.FC<Props> = ({title, children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

export default Card;