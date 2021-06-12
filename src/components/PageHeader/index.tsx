import React from 'react'
import classNames from 'classnames';

import styles from './index.module.scss'

const cx = classNames.bind(styles);

type Props = {
  title: string
  children?: JSX.Element[] | JSX.Element
  style?: string
}

const PageHeader: React.FC<Props> = ({ title, children, style }: Props) => {
  return (
    <header className={cx(styles.container, style)}>
      <h1 className={styles.title}>{title}</h1>
      {children}
    </header>
  )
}

export default PageHeader
