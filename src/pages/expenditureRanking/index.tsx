import React from 'react';
import { useDateFilter, useOnOffToggle } from 'hooks';
import { useLocation } from 'react-router-dom';
import RankingList from './RankingList';
import {
  useCategorizedBills,
  useExpenditureRawBillsForSelectedMonth,
  useInitialCategories,
  useTotalExpenditureAmount,
  useTotalExpenditureCurrency
} from './hooks';
import PageHeader from 'components/PageHeader';
import MonthPicker from 'components/MonthPicker';
import MonthButton from 'components/MonthButton';

import styles from './index.module.scss';

interface LocationState {
  date: Date
}

const ExpenditureRanking = () => {
  const [isMonthFilterVisible, toggleMonthFilterModal ] = useOnOffToggle(false);
  const categories = useInitialCategories();
  const location = useLocation();
  const state = location.state as LocationState;
  const [date, setDate] = useDateFilter(state.date);
  const billsForSelectedMonth = useExpenditureRawBillsForSelectedMonth(date);
  const totalExpenditureAmount = useTotalExpenditureAmount(billsForSelectedMonth);
  const totalExpenditureCurrency = useTotalExpenditureCurrency(totalExpenditureAmount);
  const categorizedBills = useCategorizedBills(billsForSelectedMonth, categories, totalExpenditureAmount);

  const updateDate = (date: Date) => {
    setDate(date);
    toggleMonthFilterModal();
  }
  return (
    <div className={styles.container}>
      <PageHeader title='月度支出分析' style={styles.header}>
        <MonthButton date={date} onClick={toggleMonthFilterModal}/>
        <div className={styles.headerLabel}>总支出: {totalExpenditureCurrency}</div>
      </PageHeader>
      <RankingList categorizedBills={categorizedBills} />
      <MonthPicker
        defaultDate={date}
        visible={isMonthFilterVisible}
        onCancel={toggleMonthFilterModal}
        onConfirm={updateDate}
      />
    </div>
  )
};

export default ExpenditureRanking;