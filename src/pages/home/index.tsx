import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { BillGroup, Category } from 'types/bill';
import { getBillGroupBy } from 'utils/billUtil';
import ROUTE from 'constants/route';
import { useCategoryGroup, useDateFilter, useOnOffToggle, useInitialCategories } from 'hooks';
import { useInitialBills, useMonthStatistic } from './hooks';
import PageHeader from 'components/PageHeader';
import MonthButton from 'components/MonthButton';
import DateTimePicker, { DateTimePickerMode } from 'components/DatePicker';
import CategoryButton from './CategoryButton';
import CategoryModal from './CategoryModal';
import BillList from './BillList';
import CreateButton from './CreateButton';
import StatisticPanel from './StatisticPanel';

import styles from './index.module.scss';

const Home: React.FC = () => {
  const [date, setDate] = useDateFilter();
  const categories = useInitialCategories();
  const categoryGroup = useCategoryGroup(categories);
  const bills = useInitialBills(categories);
  const statistic = useMonthStatistic(bills, date);
  const [category, setCategory] = useState<Category | undefined>();
  const [billGroup, setBillGroup] = useState<BillGroup>({});

  const [isMonthFilterVisible, toggleMonthFilterModal ] = useOnOffToggle(false);
  const [isCategoryFilterVisible, toggleCategoryFilterModal] = useOnOffToggle(false);

  const history = useHistory();

  useEffect(() => {
    if (!date) return;
    const filter = {
      category: category?.id,
      date,
    };
    const billGroup = getBillGroupBy(bills, filter);
    setBillGroup(billGroup);
  }, [bills, category?.id, date]);

  const updateCategory = (category: Category | undefined) => {
    setCategory(category);
    toggleCategoryFilterModal();
  }

  const updateDate = (date: Date) => {
    setDate(date);
    toggleMonthFilterModal();
  }

  const goToExpenditureRanking = () => {
    history.push(ROUTE.EXPENDITURE_RANKING, { date });
  }

  const goToCreateBillPage = () => {
    history.push(ROUTE.CREATE_BILL);
  }

  return (
    <div className={styles.container}>
      <PageHeader title='我的账本' showBackButton={false} style={styles.header}>
        <CategoryButton category={category} onClick={toggleCategoryFilterModal} />
        <MonthButton date={date} onClick={toggleMonthFilterModal}/>
      </PageHeader>
      <CreateButton onClick={goToCreateBillPage} />
      <StatisticPanel
        statistic={statistic}
        onClick={goToExpenditureRanking}
      />
      <BillList billGroup={billGroup} />
      <CategoryModal
        defaultCategory={category}
        categoryGroup={categoryGroup}
        visible={isCategoryFilterVisible}
        onCancel={toggleCategoryFilterModal}
        onConfirm={updateCategory}
      />
      <DateTimePicker
        defaultDate={date}
        mode={DateTimePickerMode.Month}
        title='选择月份'
        visible={isMonthFilterVisible}
        onCancel={toggleMonthFilterModal}
        onConfirm={updateDate}
      />
    </div>
  )
}

export default Home