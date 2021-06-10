import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

export enum TitlePosition {
  Left,
  Center,
}

interface Props {
  title: string
  leftText?: string
  rightText?: string
  leftIconSource?: string
  rightIconSource?: string
  onLeftClick?: () => void
  onRightClick?: () => void
  titlePosition?: TitlePosition
}

const ModalHeader: React.FC<Props> = ({ title, titlePosition, leftText, rightText, leftIconSource, rightIconSource, onLeftClick, onRightClick }) => {
  const titleStyle = cx({
    [styles.leftTitle]: titlePosition === TitlePosition.Left,
    [styles.centralTitle]: !titlePosition || titlePosition === TitlePosition.Center,
  })
  return (
    <div className={styles.container}>
      {leftText && <span className={styles.left} onClick={onLeftClick}>{ leftText }</span> }
      {leftIconSource && <img className={styles.left} src={leftIconSource} onClick={onLeftClick} alt="modalHeaderLeftIcon"/>}
      <span className={titleStyle}>{title}</span>
      {rightText && <span className={styles.right} onClick={onRightClick}>{ rightText }</span> }
      {rightIconSource && <img className={styles.right} src={rightIconSource} onClick={onRightClick} alt="modalHeaderRightIcon"/>}
    </div>
  )
}

export default ModalHeader;