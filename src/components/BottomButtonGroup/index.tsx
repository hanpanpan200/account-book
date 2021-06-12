import React from 'react';
import classNames from 'classnames';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  onCancel: () => void
  onConfirm: () => void
}

const BottomButtonGroup: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.container}>
      <div className={cx(styles.button, styles.cancel)} onClick={onCancel}>取消</div>
      <div className={cx(styles.button, styles.confirm)} onClick={onConfirm}>确定</div>
    </div>
  )
};

export default BottomButtonGroup;
