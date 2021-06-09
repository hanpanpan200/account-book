import React, { useCallback, useState } from 'react';
import DatePicker from 'rmc-date-picker';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN'
import ModalHeader from 'components/ModalHeader';
import ModalOverlay from 'components/ModalOverlay';

import styles from './index.module.scss'
import HorizontalSplitter from '../../../components/HorizentalSplitter';

interface Props {
  defaultDate?: Date
  visible: boolean
  onCancel: () => void
  onConfirm: (date: Date) => void
}

const MonthPicker: React.FC<Props> = ({ defaultDate, visible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);

  const handleCancel = useCallback(() => {
    setSelectedDate(defaultDate);
    onCancel();
  }, [defaultDate, onCancel]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirm = useCallback(() => {
    if (selectedDate) {
      onConfirm(selectedDate);
    }
  }, [selectedDate, onConfirm]);

  return (
    <ModalOverlay visible={visible}>
      <div className={styles.container}>
        <ModalHeader
          title='选择月份'
          leftText='取消'
          rightText='确定'
          onLeftClick={handleCancel}
          onRightClick={handleConfirm}
        />
        <HorizontalSplitter />
        <DatePicker
          use12Hours
          mode='month'
          locale={zhCn}
          defaultDate={defaultDate}
          onDateChange={handleDateChange}
        />
      </div>
    </ModalOverlay>

  )
};

export default MonthPicker;
