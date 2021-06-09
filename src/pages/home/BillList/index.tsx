import React from 'react';
import { BillGroup } from 'types/bill';
import CardItem from 'components/CardItem';
import emptyIcon from 'assets/icons/empty.svg';
import HorizontalSplitter from 'components/HorizentalSplitter';
import Card from 'components/Card';

import styles from './index.module.scss';

interface Props {
  billGroup: BillGroup
}

const BillList:React.FC<Props> = ({ billGroup }) => {
  if (Object.keys(billGroup).length === 0) {
    return (
      <div className={styles.empty}>
        <img alt='emptyIcon' src={emptyIcon}/>
        <div>本月没有账单哦，试试查看其它月份或类型吧！</div>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      {Object.entries(billGroup).map(([date, bills]) => {
        return (
          <Card title={date} key={date}>
            {bills.map((bill, index) => (
              <div key={bill.id}>
                <CardItem
                  iconSource={bill.category.icon}
                  title={bill.category.name}
                  description={bill.time}
                  content={bill.currency}
                />
                {index < bills.length -1 && <HorizontalSplitter />}
              </div>
            ))}
          </Card>
        )
      })}
    </div>
  )
}

export default BillList;