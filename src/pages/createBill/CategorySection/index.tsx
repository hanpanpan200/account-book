import React from 'react';
import { BillTypeName, Category } from 'types/bill';
import { useCategoryGroup, useInitialCategories } from 'hooks';
import { useCategoriesForType } from '../hooks';
import HorizontalSplitter from 'components/HorizentalSplitter';
import BillTypeButton from '../BillTypeButton';
import CategoryItem from '../CategoryItem';

import styles from './index.module.scss';

interface Props {
  selectedBillTypeName: BillTypeName
  onBillTypeSelected: (billType: BillTypeName) => void
  selectedCategory?: Category
  onCategorySelected: (category: Category) => void
}

const billsTypeNames = [BillTypeName.Expenditure, BillTypeName.Income];

const CategorySection: React.FC<Props> = ({
    selectedBillTypeName,
    onBillTypeSelected,
    selectedCategory,
    onCategorySelected
  }) => {
  const categories = useInitialCategories();
  const categoryGroup = useCategoryGroup(categories);
  const selectedCategories = useCategoriesForType(categoryGroup, selectedBillTypeName);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {billsTypeNames.map(billTypeName =>
          <BillTypeButton
            key={billTypeName}
            billTypeName={billTypeName}
            selectedBillType={billTypeName === selectedBillTypeName}
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
