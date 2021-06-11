import React from 'react';
import classNames from 'classnames';
import { useCurrency } from 'hooks';
import { Statistic } from 'types/bill';
import ModalHeader, { TitlePosition } from 'components/ModalHeader';
import HorizontalSplitter from 'components/HorizentalSplitter';
import arrowRightIcon from 'assets/icons/arrow-right.svg';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

interface Props {
  statistic: Statistic
  onClick: () => void
}

const StatisticPanel: React.FC<Props> = ({ statistic, onClick }) => {
  const totalExpenditure = useCurrency(statistic.totalExpenditure);
  const totalIncome = useCurrency(statistic.totalIncome);

  return (
    <div className={styles.container}>
      <ModalHeader
        title='月度汇总'
        rightIconSource={arrowRightIcon}
        onRightClick={onClick}
        titlePosition={TitlePosition.Left}
      />
      <HorizontalSplitter />
      <div className={styles.content}>
        <div className={styles.left}>
          <span className={styles.label}>总收入(元)</span>
          <span className={cx(styles.text, styles.incomeText)}>{totalIncome}</span>
        </div>
        <div className={styles.right}>
          <span className={styles.label}>总支出(元)</span>
          <span className={cx(styles.text, styles.expenditureText)}>{totalExpenditure}</span>
        </div>
      </div>
    </div>
  )
};

export default StatisticPanel;