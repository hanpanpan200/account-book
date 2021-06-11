import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import Header from 'pages/home/Header'
import client from 'adapters/localStorageClient';
import { Bill, BillGroup, Category, CategoryGroup, GroupCondition, Statistic } from 'types/bill';
import { getBillGroupBy, getBills, getCategoryGroup, getStatisticsBy } from 'utils/billUtil';
import { getNow } from 'utils/dateUtil';
import { getMonth, getYear } from 'utils';
import { DEFAULT_STATISTIC } from '../../constants';
import ROUTE from 'constants/route';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';
import MonthButton from './MonthButton';
import MonthPicker from './MonthPicker';
import BillList from './BillList';
import StatisticPanel from './StatisticPanel';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<Category | undefined>();
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState<boolean>(false);
  const [isMonthFilterVisible, setIsMonthFilterVisible] = useState<boolean>(false);

  const [bills, setBills] = useState<Bill[]>([]);
  const [billGroup, setBillGroup] = useState<BillGroup>({});
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});
  const [statistic, setStatistic] = useState<Statistic>(DEFAULT_STATISTIC);

  const history = useHistory();

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
    const statisticForSelectedMonth = getStatisticsBy(bills, date, DEFAULT_STATISTIC);
    setStatistic(statisticForSelectedMonth);
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
    history.push(ROUTE.EXPENDITURE_RANKING);
  }

  return (
    <div className={styles.container}>
      <Header title='我的账本'>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <MonthButton date={date} onClick={toggleMonthFilter}/>
      </Header>
      <StatisticPanel
        statistic={statistic}
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