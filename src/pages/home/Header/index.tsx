import React from 'react'

import styles from './index.module.scss'

type IProps = {
  title: string
  children: JSX.Element[]
}

const Header: React.FC<IProps> = ({ title, children }: IProps) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  )
}

export default Header
