import React from 'react';
import createIcon from 'assets/icons/create.svg';

import styles from './index.module.scss';

interface Props {
  onClick: () => void
}

const CreateButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <img src={createIcon} alt='createIcon' />
      <span>记一笔</span>
    </div>
  );
};

export default CreateButton;
