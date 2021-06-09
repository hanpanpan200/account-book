import React from 'react';
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  visible: boolean
  children: JSX.Element
}

const ModalOverlay:React.FC<Props> = ({children, visible}) => {
  return (
    <div className={cx(styles.container, {[styles.show]: visible, [styles.hide]: !visible })}>
      {children}
    </div>
  )
}

export default ModalOverlay;