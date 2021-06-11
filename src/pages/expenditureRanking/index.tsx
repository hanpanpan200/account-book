import React from 'react';
import { useCurrency, useDateFilter, useInitialBills, useOnOffToggle, useStatistic } from 'hooks';
import { useLocation} from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import MonthPicker from 'components/MonthPicker';
import MonthButton from 'components/MonthButton';

import styles from './index.module.scss';
import RankingList from './RankingList';

const ExpenditureRanking = () => {
  const location = useLocation();
  // @ts-ignore
  const [date, setDate] = useDateFilter(location.state.date);
  const bills = useInitialBills();
  const statistic = useStatistic(bills, date);
  const totalExpenditure = useCurrency(statistic.totalExpenditure);
  const [isMonthFilterVisible, toggleMonthFilterModal ] = useOnOffToggle(false);

  const updateDate = (date: Date) => {
    setDate(date);
    toggleMonthFilterModal();
  }

  return (
    <div className={styles.container}>
      <PageHeader title='月度支出分析' style={styles.header}>
        <MonthButton date={date} onClick={toggleMonthFilterModal}/>
        <div className={styles.headerLabel}>总支出: {totalExpenditure}</div>
      </PageHeader>
      <RankingList />
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