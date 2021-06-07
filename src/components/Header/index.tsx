import React from 'react'

import styles from './index.module.scss'

type IProps = {
  title: string
}

const Header: React.FC<IProps> = (props: IProps) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{props.title}</h1>
    </header>
  )
}

export default Header
