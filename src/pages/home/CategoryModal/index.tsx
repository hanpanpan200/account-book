import React, { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { Category, CategoryGroup } from 'types/bill';
import ModalOverlay from 'components/ModalOverlay';
import ModalHeader from 'components/ModalHeader';
import HorizontalSplitter from 'components/HorizentalSplitter';
import BottomButtonGroup from 'components/BottomButtonGroup';
import cancelIcon from 'assets/icons/cancel.svg';

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

  const handleCancel = useCallback(() => {
    setSelectedCategory(defaultCategory);
    onCancel();
  }, [defaultCategory, onCancel]);

  const handleConfirm = useCallback(() => {
    onConfirm(selectedCategory);
  }, [onConfirm, selectedCategory]);

  const handleCategorySelected = (category: Category) => {
    const targetCategory = category.id === selectedCategory?.id ? undefined : category;
    setSelectedCategory(targetCategory);
  }
  return (
    <ModalOverlay visible={visible}>
      <div className={styles.container}>
        <ModalHeader title='选择类型' rightIconSource={cancelIcon} onRightClick={handleCancel} />
        <HorizontalSplitter />
        <div className={styles.modalContent}>
          {Object.entries(categoryGroup).map(([categoryTypeName, categories]) => {
            return (
              <div key={categoryTypeName}>
                <div className={styles.contentHeader}>{categoryTypeName}</div>
                <div className={styles.categoryList}>
                  {categories.map(category =>{
                    const categoryItemStyle = cx(styles.category, {
                      [styles.selected]: category.id === selectedCategory?.id,
                    })
                    return (
                      <span
                        key={category.id}
                        className={categoryItemStyle}
                        onClick={() => handleCategorySelected(category)}
                      >
                        {category.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
        <HorizontalSplitter />
        <BottomButtonGroup onCancel={handleCancel} onConfirm={handleConfirm} />
      </div>
    </ModalOverlay>
  )
}

export default CategoryModal;