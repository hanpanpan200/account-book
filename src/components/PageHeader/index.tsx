import React, { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import arrowLeftIcon from 'assets/icons/arrow-left.svg';

import styles from './index.module.scss'

const cx = classNames.bind(styles);

type Props = {
  title: string
  showBackButton: boolean
  children?: JSX.Element[] | JSX.Element
  style?: string
}

const PageHeader: React.FC<Props> = ({ title, showBackButton, children, style }: Props) => {
  const history = useHistory();
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <header className={cx(styles.container, style)}>
      <div className={styles.titleContainer}>
        {showBackButton && <img src={arrowLeftIcon} alt="arrowLeftIcon" onClick={goBack} />}
        <h1>{title}</h1>
      </div>
      {children}
    </header>
  )
}

export default PageHeader
