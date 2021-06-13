import React from 'react';
import { useDateFilter, useInitialCategories, useOnOffToggle } from 'hooks';
import { useLocation } from 'react-router-dom';
import RankingList from './RankingList';
import {
  useCategorizedBills,
  useExpenditureRawBillsForSelectedMonth,
  useTotalExpenditureAmount,
  useTotalExpenditureCurrency
} from './hooks';
import PageHeader from 'components/PageHeader';
import DateTimePicker, { DateTimePickerMode } from 'components/DatePicker';
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
  };

  return (
    <div className={styles.container}>
      <PageHeader title='月度支出分析' style={styles.header} showBackButton>
        <MonthButton date={date} onClick={toggleMonthFilterModal}/>
        <div className={styles.headerLabel}>总支出: {totalExpenditureCurrency}</div>
      </PageHeader>
      <RankingList categorizedBills={categorizedBills} />
      <DateTimePicker
        title='选择月份'
        mode={DateTimePickerMode.Month}
        defaultDate={date}
        visible={isMonthFilterVisible}
        onCancel={toggleMonthFilterModal}
        onConfirm={updateDate}
      />
    </div>
  )
};

export default ExpenditureRanking;