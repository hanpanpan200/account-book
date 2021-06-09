import React from 'react'

import styles from './index.module.scss'

type Props = {
  title: string
  children: JSX.Element[]
}

const Header: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  )
}

export default Header
