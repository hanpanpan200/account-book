import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  iconSource: string
  title: string | React.ReactElement
  description: string | React.ReactElement
  content: string
}

const CardItem:React.FC<Props> = ({iconSource, title, description, content}) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img alt='leftIcon' className={styles.icon} src={iconSource} />
      </div>
      <div className={styles.middle}>
        <div className={styles.text}>{title}</div>
        <div className={cx(styles.text, styles.light)}>{description}</div>
      </div>
      <div className={cx(styles.right, styles.text)}>{content}</div>
    </div>
  )
}

export default CardItem;