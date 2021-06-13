import React from 'react';
import styles from './index.module.scss';

interface Props {
  amount: string
  onAmountChange: (newAmount: string) => void
}

const AmountSection: React.FC<Props> = ({ amount, onAmountChange }) => {
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAmountChange(event.target.value);
  }

  return (
    <div className={styles.inputSection}>
      <label>￥</label>
      <input
        type='number'
        onChange={handleAmountChange}
        value={amount}
        placeholder='请输入金额'
      />
    </div>
  );
};

export default AmountSection;
