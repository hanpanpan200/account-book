import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import client from 'adapters/localStorageClient';
import { BillGroup, Category, CategoryGroup, GroupCondition } from 'types/bill';
import { getBillGroupBy, getCategoryGroup } from 'utils/billUtil';
import { getMonth, getYear } from 'utils';
import ROUTE from 'constants/route';
import { useDateFilter, useInitialBills, useOnOffToggle, useStatistic } from 'hooks';
import PageHeader from 'components/PageHeader';
import MonthButton from 'components/MonthButton';
import MonthPicker from 'components/MonthPicker';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';
import BillList from './BillList';
import StatisticPanel from './StatisticPanel';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const [date, setDate] = useDateFilter();
  const bills = useInitialBills();
  const statistic = useStatistic(bills, date);
  const [category, setCategory] = useState<Category | undefined>();
  const [billGroup, setBillGroup] = useState<BillGroup>({});
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});

  const [isMonthFilterVisible, toggleMonthFilterModal ] = useOnOffToggle(false);
  const [isCategoryFilterVisible, toggleCategoryFilterModal] = useOnOffToggle(false);

  const history = useHistory();

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
    client.fetchCategories().then((categories) => {
      if (categories) {
        const categoryGroup = getCategoryGroup(categories);
        setCategoryGroup(categoryGroup);
      }
    }).catch(() => {
      console.log('failed to load categories')
    })
  }, [])

  const updateCategory = (category: Category | undefined) => {
    setCategory(category);
    toggleCategoryFilterModal();
  }

  const updateDate = (date: Date) => {
    setDate(date);
    toggleMonthFilterModal();
  }

  const showExpenditureRanking = () => {
    history.push(ROUTE.EXPENDITURE_RANKING, { date });
  }

  return (
    <div className={styles.container}>
      <PageHeader title='我的账本' style={styles.header}>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <MonthButton date={date} onClick={toggleMonthFilterModal}/>
      </PageHeader>
      <StatisticPanel
        statistic={statistic}
        onClick={showExpenditureRanking}
      />
      <BillList billGroup={billGroup} />
      <CategoryModal
        defaultCategory={category}
        categoryGroup={categoryGroup}
        visible={isCategoryFilterVisible}
        onCancel={toggleCategoryFilterModal}
        onConfirm={updateCategory}
      />
      <MonthPicker
        defaultDate={date}
        visible={isMonthFilterVisible}
        onCancel={toggleMonthFilterModal}
        onConfirm={updateDate}
      />
    </div>
  )
}

export default Home