import React from 'react';

import styles from './index.module.scss';

interface Props {
  title: string
  leftText?: string
  rightText?: string
  leftIconSource?: string
  rightIconSource?: string
  onLeftClick?: () => void
  onRightClick?: () => void
}

const ModalHeader: React.FC<Props> = ({ title, leftText, rightText, leftIconSource, rightIconSource, onLeftClick, onRightClick }) => {
  return (
    <div className={styles.container}>
      {leftText && <span className={styles.left} onClick={onLeftClick}>{ leftText }</span> }
      {leftIconSource && <img className={styles.left} src={leftIconSource} onClick={onLeftClick} alt="modalHeaderLeftIcon"/>}
      <span>{title}</span>
      {rightText && <span className={styles.right} onClick={onRightClick}>{ rightText }</span> }
      {rightIconSource && <img className={styles.right} src={rightIconSource} onClick={onRightClick} alt="modalHeaderRightIcon"/>}
    </div>
  )
}

export default ModalHeader;