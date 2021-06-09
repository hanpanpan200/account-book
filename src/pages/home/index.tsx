import React, { useCallback, useEffect, useState } from 'react'
import Header from 'pages/home/Header'
import client from 'adapters/localStorageClient';
import { BillGroup, Category, CategoryGroup, GroupCondition } from 'types/bill';
import { getBillGroupBy, getCategoryGroup, } from 'utils/billUtil';
import { getNow } from 'utils/dateUtil';
import { getMonth, getYear } from 'utils';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';
import MonthButton from './MonthButton';
import MonthPicker from './MonthPicker';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<Category | undefined>();
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState<boolean>(false);
  const [isMonthFilterVisible, setIsMonthFilterVisible] = useState<boolean>(false);

  const [billGroup, setBillGroup] = useState<BillGroup>({});
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});

  useEffect(() => {
    setDate(getNow());
  }, [])

  useEffect(() => {
    if (!date) return;

    client.fetchBills().then((rawBills) => {
      if (rawBills) {
        const filter = {
          category: category?.id,
          year: getYear(date),
          month: getMonth(date),
        };
        const billGroup = getBillGroupBy(rawBills, filter, GroupCondition.Date);
        setBillGroup(billGroup);
      }
    }).catch(() => {
      console.log('failed to load bills')
    });
  }, [category?.id, date]);

  useEffect(() => {
    client.fetchCategories().then((categories) => {
      if (categories) {
        const categoryGroup = getCategoryGroup(categories);
        setCategoryGroup(categoryGroup);
      }
    }).catch(() => {
      console.log('failed to load categories')
    })
  }, [])

  const toggleCategoryFilterModal = useCallback(() => {
    setIsCategoryModalVisible(!isCategoryModalVisible);
  }, [isCategoryModalVisible]);

  const toggleMonthFilter = useCallback(() => {
    setIsMonthFilterVisible(!isMonthFilterVisible);
  }, [isMonthFilterVisible]);

  const updateCategory = (category: Category | undefined) => {
    setCategory(category);
    toggleCategoryFilterModal();
  }

  const updateDate = (date: Date) => {
    setDate(date);
    toggleMonthFilter();
  }

  return (
    <div className={styles.container}>
      <Header title='我的账本'>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <MonthButton date={date} onClick={toggleMonthFilter}/>
      </Header>
      <CategoryModal
        defaultCategory={category}
        categoryGroup={categoryGroup}
        visible={isCategoryModalVisible}
        onCancel={toggleCategoryFilterModal}
        onConfirm={updateCategory}
      />
      <MonthPicker
        defaultDate={date}
        visible={isMonthFilterVisible}
        onCancel={toggleMonthFilter}
        onConfirm={updateDate}
      />
    </div>
  )
}

export default Home