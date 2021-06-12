import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { Category } from 'types/bill';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  category: Category
  selected: boolean
  onClick: (category: Category) => void
}

export const CategoryItem: React.FC<Props> = ({ category, selected, onClick }) => {
  const handleClicked = useCallback(() => {
    onClick(category);
  }, [onClick, category]);

  const containerStyle = useMemo(() => cx(styles.container, { [styles.selected]: selected }), [selected]);

  return (
    <div className={containerStyle} onClick={handleClicked}>
      <img src={category.icon} alt='categoryIcon' />
      <div>{category.name}</div>
    </div>
  );
};

export default CategoryItem;
