import React from 'react';
import { CategorizedBill } from 'types/bill';
import { getPercentage, getRateString } from 'utils/billUtil';
import Card from 'components/Card';
import CardItem from 'components/CardItem';
import ProgressBar from 'components/ProgressBar';
import RankItemTitle from '../RankItemTitle';

import styles from './index.module.scss';

interface Props {
  categorizedBills: CategorizedBill[]
}

const RankingList: React.FC<Props> = ({ categorizedBills }) => {
  return (
    <div className={styles.container}>
      <Card title='支出分类'>
        {categorizedBills.map((categorizedBill, index) => {
          const { category, rate, totalAmountCurrency } = categorizedBill;
          const { icon, name } = category;
          return (
            <CardItem
              key={`${name}-${index}`}
              iconSource={icon}
              title={<RankItemTitle label={getRateString(categorizedBill)} title={name} />}
              description={<ProgressBar percentage={getPercentage(rate)} />}
              content={totalAmountCurrency}
            />)
        })}
      </Card>
    </div>
  );
};

export default RankingList;
