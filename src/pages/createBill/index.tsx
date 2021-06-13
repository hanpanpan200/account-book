import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDateFilter, useOnOffToggle } from 'hooks';
import { BillType, Category } from 'types/bill';
import { createNewBill, getBillInvalidMessage } from './util';
import PageHeader from 'components/PageHeader';
import DateTimePicker, { DateTimePickerMode } from 'components/DatePicker';
import BottomButtonGroup from 'components/BottomButtonGroup';
import CategorySection from './CategorySection';
import DateSection from './DateSection';
import AmountSection from './AmountSection';
import { BILL_TYPE } from '../../constants';

import styles from './index.module.scss';

const CreateBill = () => {
  const [date, setDate] = useDateFilter();
  const [isDateFilterVisible, toggleDateFilterModal ] = useOnOffToggle(false);
  const history = useHistory();

  const [amount, setAmount] = useState<string>('');
  const [selectedBillType, setSelectedBillType] = useState<BillType>(BILL_TYPE.EXPENDITURE);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleAmountChange = (newAmount: string) => setAmount(newAmount);
  const handleBillTypeSelected = (billType: BillType) => setSelectedBillType(billType);
  const handleCategorySelected = (category: Category) => setSelectedCategory(category);

  const updateDate = (date: Date) => {
    setDate(date);
    toggleDateFilterModal();
  };

  const handleConfirm = useCallback(() => {
    const invalidMessage = getBillInvalidMessage(amount, selectedCategory);
    if (invalidMessage) {
      alert(invalidMessage);
      return;
    }
    createNewBill(amount, selectedCategory as Category, date);
    history.goBack();
  }, [amount, selectedCategory, date, history]);

  const handleCancel = useCallback(() => {
    if (window.confirm('放弃记一笔吗？')) {
      history.goBack();
    }
  }, [history]);

  return (
    <div className={styles.container}>
      <PageHeader title='记一笔' showBackButton />
      <AmountSection amount={amount} onAmountChange={handleAmountChange} />
      <CategorySection
        selectedBillType={selectedBillType}
        onBillTypeSelected={handleBillTypeSelected}
        onCategorySelected={handleCategorySelected}
        selectedCategory={selectedCategory}
      />
      <DateSection date={date} onClick={toggleDateFilterModal} />
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
