import React, { useCallback, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import cancelIcon from 'assets/icons/cancel.svg';
import { Category, CategoryGroup } from 'types/bill';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  defaultCategory?: Category
  categoryGroup: CategoryGroup
  visible: boolean
  onConfirm: (category?: Category) => void
  onCancel: () => void
}

const CategoryModal: React.FC<Props> = ({ defaultCategory, categoryGroup, visible, onConfirm, onCancel}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const visibleStyle = useMemo(() => visible ? styles.show : styles.hide, [visible]);
  const cancel = useCallback(() => {
    setSelectedCategory(defaultCategory);
    onCancel();
  }, [defaultCategory, onCancel]);

  const confirm = useCallback(() => {
    onConfirm(selectedCategory);
  }, [onConfirm, selectedCategory]);

  const handleCategorySelected = (category: Category) => {
    const targetCategory = category.id === selectedCategory?.id ? undefined : category;
    setSelectedCategory(targetCategory);
  }

  return (
    <div className={`${styles.container} ${visibleStyle}`}>
      <div className={styles.categoryModal}>
        <div className={styles.categoryModalHeader}>
          <span>请选择类型</span>
          <img src={cancelIcon} onClick={cancel} alt='cancelIcon' />
        </div>
        <div className={styles.verticalSplitter} />
        <div className={styles.categoryModalContent}>
          {Object.entries(categoryGroup).map(([categoryTypeName, categories]) => {
            return (
              <div key={categoryTypeName}>
                <div className={styles.categoryModalContentHeader}>{categoryTypeName}</div>
                <div className={styles.categoryList}>
                  {categories.map(category =>{
                    const categoryItemStyle = cx({
                      [styles.category]: true,
                      [styles.selected]: category.id === selectedCategory?.id,
                    })
                    return (
                      <span key={category.id} className={categoryItemStyle} onClick={() => handleCategorySelected(category)}>
                        {category.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <div className={styles.verticalSplitter} />
        <div className={styles.buttonGroupContainer}>
          <div className={`${styles.button} ${styles.cancelButton}`} onClick={cancel}>取消</div>
          <div className={`${styles.button} ${styles.confirmButton}`} onClick={confirm}>确定</div>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal;