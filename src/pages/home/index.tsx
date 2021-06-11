import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Header from 'pages/home/Header'
import client from 'adapters/localStorageClient';
import { Bill, BillGroup, Category, CategoryGroup, GroupCondition, Statistics } from 'types/bill';
import { getBillGroupBy, getBills, getCategoryGroup, getStatisticsBy } from 'utils/billUtil';
import { getNow } from 'utils/dateUtil';
import { getCurrency, getMonth, getYear } from 'utils';
import { DEFAULT_STATISTICS } from '../../constants';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';
import MonthButton from './MonthButton';
import MonthPicker from './MonthPicker';
import BillList from './BillList';
import StatisticsPanel from './StatisticsPanel';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<Category | undefined>();
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState<boolean>(false);
  const [isMonthFilterVisible, setIsMonthFilterVisible] = useState<boolean>(false);

  const [bills, setBills] = useState<Bill[]>([]);
  const [billGroup, setBillGroup] = useState<BillGroup>({});
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});
  const [statistics, setStatistics] = useState<Statistics>(DEFAULT_STATISTICS);

  useEffect(() => {
    setDate(getNow());
  }, [])

  useEffect(() => {
    client.fetchBills().then((rawBills) => {
      if (rawBills) {
        const allBills = getBills(rawBills);
        setBills(allBills);
      }
    }).catch(() => {
      console.log('load raw bills error.');
    });
  }, []);

  useEffect(() => {
    if (!date) return;
    const filter = {
      category: category?.id,
      year: getYear(date),
      month: getMonth(date),
    };
    const billGroup = getBillGroupBy(bills, filter, GroupCondition.Date);
    setBillGroup(billGroup);
  }, [bills, category?.id, date]);

  useEffect(() => {
    if (!date) return;
    const statisticsForSelectedMonth = getStatisticsBy(bills, date, DEFAULT_STATISTICS);
    setStatistics(statisticsForSelectedMonth);
  }, [bills, date]);

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

  const showExpenditureRanking = () => {

  }

  const totalIncomeCurrency = useMemo(() => getCurrency(statistics.totalIncome),
    [statistics.totalIncome]);
  const totalExpenditureCurrency = useMemo(() => getCurrency(statistics.totalExpenditure),
    [statistics.totalExpenditure]);
  return (
    <div className={styles.container}>
      <Header title='我的账本'>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <MonthButton date={date} onClick={toggleMonthFilter}/>
      </Header>
      <StatisticsPanel
        totalIncome={totalIncomeCurrency}
        totalExpenditure={totalExpenditureCurrency}
        onClick={showExpenditureRanking}
      />
      <BillList billGroup={billGroup} />
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