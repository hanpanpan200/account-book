import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from 'rmc-date-picker';
import 'rmc-picker/assets/index.css';
import 'rmc-date-picker/assets/index.css';
import zhCn from 'rmc-date-picker/lib/locale/zh_CN'
import ModalHeader from 'components/ModalHeader';
import ModalOverlay from 'components/ModalOverlay';
import HorizontalSplitter from '../HorizentalSplitter';

import styles from './index.module.scss'

export enum DateTimePickerMode {
  Month = 'month',
  DateTime = 'datetime'
}

interface Props {
  defaultDate?: Date
  visible: boolean
  mode: DateTimePickerMode
  title: string
  onCancel: () => void
  onConfirm: (date: Date) => void
}

const DateTimePicker: React.FC<Props> =
  ({ defaultDate, title, mode, visible, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(defaultDate);

  useEffect(() => {
    setSelectedDate(defaultDate);
  }, [defaultDate]);

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
          title={title}
          leftText='取消'
          rightText='确定'
          onLeftClick={handleCancel}
          onRightClick={handleConfirm}
        />
        <HorizontalSplitter />
        <DatePicker
          use12Hours
          date={selectedDate}
          mode={mode}
          locale={zhCn}
          defaultDate={defaultDate}
          onDateChange={handleDateChange}
        />
      </div>
    </ModalOverlay>

  )
};

export default DateTimePicker;
