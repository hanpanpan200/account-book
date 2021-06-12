import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { CategoryTypeName } from 'types/bill';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  selected: boolean
  categoryTypeName: CategoryTypeName
  onClick: (categoryTypeName: CategoryTypeName) => void
}

const CategoryOptionButton: React.FC<Props> = ({ categoryTypeName, selected, onClick }) => {
  const containerStyle = useMemo(() => {
    return cx(styles.container,  {
      [styles.selectedGreen]: selected && categoryTypeName === CategoryTypeName.Expenditure,
      [styles.selectedRed]: selected && categoryTypeName === CategoryTypeName.Income,
    })
  }, [selected, categoryTypeName]);

  const handleClicked = useCallback(() => {
    onClick(categoryTypeName);
  }, [onClick, categoryTypeName]);

  return (
    <div className={containerStyle} onClick={handleClicked}>
      {categoryTypeName.toString()}
    </div>
  );
};

export default CategoryOptionButton;
