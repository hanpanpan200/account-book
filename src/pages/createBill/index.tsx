import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useCategoryGroup, useDateFilter, useInitialCategories, useOnOffToggle } from 'hooks';
import { Category, CategoryTypeName } from 'types/bill';
import { getFullDateString } from 'utils/dateUtil';
import { createBill } from 'utils/request';
import { isValidAmount } from 'utils';
import PageHeader from 'components/PageHeader';
import HorizontalSplitter from 'components/HorizentalSplitter';
import DateTimePicker, { DateTimePickerMode } from 'components/DatePicker';
import BottomButtonGroup from 'components/BottomButtonGroup';
import CategoryItem from './CategoryItem';
import CategoryOptionButton from './CategoryOptionButton';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

import styles from './index.module.scss';

const categoryTypeNames = [CategoryTypeName.Expenditure, CategoryTypeName.Income];

const CreateBill = () => {
  const [date, setDate] = useDateFilter();
  const [amount, setAmount] = useState<string>('');
  const categories = useInitialCategories();
  const categoryGroup = useCategoryGroup(categories);
  const [selectedCategoryType, setSelectedCategoryType] = useState<CategoryTypeName>(CategoryTypeName.Expenditure);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
  const [isDateFilterVisible, toggleDateFilterModal ] = useOnOffToggle(false);

  const history = useHistory();

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value===', event.target.value);
    setAmount(event.target.value);
  }

  console.log('amount=====', amount);

  const selectedCategories = useMemo(
    () => categoryGroup[selectedCategoryType.toString()] || [],
    [categoryGroup, selectedCategoryType]
  );

  const handleCategoryTypeSelected = (categoryTypeName: CategoryTypeName) => {
    setSelectedCategoryType(categoryTypeName);
  };

  const handleCategorySelected = (category: Category) => {
    setSelectedCategory(category);
  };

  const updateDate = (date: Date) => {
    setDate(date);
    toggleDateFilterModal();
  };

  const handleConfirm = useCallback(() => {
    if (!isValidAmount(amount)) {
      alert('请填写正确的金额');
      return;
    }
    if (selectedCategory === undefined) {
      alert('请选择支出类型');
      return;
    }
    createBill({
      amount: parseFloat(amount),
      category: selectedCategory.id,
      time: date.getTime(),
      type: selectedCategory.type
    });
    history.goBack();
  }, [amount, selectedCategory, date, history]);

  const handleCancel = useCallback(() => {
    if (window.confirm('放弃记一笔吗？')) {
      history.goBack();
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <PageHeader title='记一笔' />
      <div className={styles.inputSection}>
        <label>￥</label>
        <input
          type='number'
          onChange={handleAmountChange}
          value={amount}
          placeholder='请输入金额'
        />
      </div>
      <div className={styles.categorySection}>
        <div className={styles.header}>
          {categoryTypeNames.map(categoryTypeName =>
            <CategoryOptionButton
              key={categoryTypeName}
              categoryTypeName={categoryTypeName}
              selected={categoryTypeName === selectedCategoryType}
              onClick={handleCategoryTypeSelected}
            />
          )}
        </div>
        <HorizontalSplitter />
        <div className={styles.categoryList}>
          {selectedCategories.map(category =>
            <CategoryItem
              key={category.id}
              category={category}
              selected={selectedCategory === category}
              onClick={handleCategorySelected}
            />
          )}
        </div>
      </div>
      <div className={styles.dateSection} onClick={toggleDateFilterModal}>
        <label>{getFullDateString(date)}</label>
        <img src={arrowRightIcon} alt='arrowRightIcon' />
      </div>
      <DateTimePicker
        title='选择时间'
        mode={DateTimePickerMode.DateTime}
        defaultDate={date}
        visible={isDateFilterVisible}
        onCancel={toggleDateFilterModal}
        onConfirm={updateDate}
      />
      <BottomButtonGroup onCancel={handleCancel} onConfirm={handleConfirm} />
    </div>
  )
};

export default CreateBill;
