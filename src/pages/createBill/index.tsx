import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDateFilter, useOnOffToggle } from 'hooks';
import { Category, BillTypeName } from 'types/bill';
import { createNewBill, getBillInvalidMessage } from 'utils';
import PageHeader from 'components/PageHeader';
import DateTimePicker, { DateTimePickerMode } from 'components/DatePicker';
import BottomButtonGroup from 'components/BottomButtonGroup';

import styles from './index.module.scss';
import CategorySection from './CategorySection';
import DateSection from './DateSection';
import AmountSection from './AmountSection';

const CreateBill = () => {
  const [date, setDate] = useDateFilter();
  const [isDateFilterVisible, toggleDateFilterModal ] = useOnOffToggle(false);
  const history = useHistory();

  const [amount, setAmount] = useState<string>('');
  const [selectedCategoryType, setSelectedBillType] = useState<BillTypeName>(BillTypeName.Expenditure);
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

  const handleAmountChange = (newAmount: string) => setAmount(newAmount);
  const handleBillTypeSelected = (billTypeName: BillTypeName) => setSelectedBillType(billTypeName);
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
      <PageHeader title='记一笔' />
      <AmountSection amount={amount} onAmountChange={handleAmountChange} />
      <CategorySection
        selectedBillTypeName={selectedCategoryType}
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
