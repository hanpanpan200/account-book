import React from 'react'

import styles from './index.module.scss'

type Props = {
  title: string
  children?: JSX.Element[]
}

const PageHeader: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  )
}

export default PageHeader
