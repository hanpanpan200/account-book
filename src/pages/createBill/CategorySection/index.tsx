import React from 'react';
import { BillType, Category } from 'types/bill';
import { useCategoryGroup, useInitialCategories } from 'hooks';
import { useCategoriesForType } from '../hooks';
import { BILL_TYPE } from '../../../constants';
import HorizontalSplitter from 'components/HorizentalSplitter';
import BillTypeButton from '../BillTypeButton';
import CategoryItem from '../CategoryItem';

import styles from './index.module.scss';

interface Props {
  selectedBillType: BillType
  onBillTypeSelected: (billType: BillType) => void
  selectedCategory?: Category
  onCategorySelected: (category: Category) => void
}

const billsTypes = [BILL_TYPE.EXPENDITURE, BILL_TYPE.INCOME];

const CategorySection: React.FC<Props> = ({
    selectedBillType,
    onBillTypeSelected,
    selectedCategory,
    onCategorySelected
  }) => {
  const categories = useInitialCategories();
  const categoryGroup = useCategoryGroup(categories);
  const selectedCategories = useCategoriesForType(categoryGroup, selectedBillType);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {billsTypes.map(billType =>
          <BillTypeButton
            key={billType.id}
            billType={billType}
            selectedBillType={billType.id === selectedBillType.id}
            onClick={onBillTypeSelected}
          />
        )}
      </div>
      <HorizontalSplitter />
      <div className={styles.list}>
        {selectedCategories.map(category =>
          <CategoryItem
            key={category.id}
            category={category}
            selected={selectedCategory?.id === category.id}
            onClick={onCategorySelected}
          />
        )}
      </div>
    </div>
  )
};

export default CategorySection;
