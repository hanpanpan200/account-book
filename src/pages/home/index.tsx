import React, { useEffect, useMemo, useState } from 'react'
import Header from 'pages/home/Header'
import client from 'adapters/localStorageClient';
import { BillGroup, GroupCondition, RawBill } from 'types/bill';
import { getBillGroupBy, } from 'utils/billUtil';
import { log } from 'util';
import { getNow } from '../../utils/dateUtil';

const Home: React.FC = () => {
  const [rawBills, setRawBills] = useState<RawBill[] | null>([]);
  const [month, setMonth] = useState<number>(getNow().getMonth() + 1);
  const [year, setYear] = useState<number>(getNow().getFullYear());
  const [category, setCategory] = useState<string | undefined>();
  const [billGroup, setBillGroup] = useState<BillGroup>();

  useMemo(() => {
    if (rawBills) {
      const filter = {
        category,
        year,
        month,
      };
      const billGroup = getBillGroupBy(rawBills, filter, GroupCondition.Date);
      setBillGroup(billGroup);
    }
  }, [rawBills, month]);

  useEffect(() => {
    client.fetchBills().then((rawBills) => {
      setRawBills(rawBills);
    }).catch(() => {
      alert('Please try again later.')
    });
  }, []);
  console.log('billGroup======', billGroup);
  return (
    <div>
      <Header title='我的账本' />
      <div>Category: {category}</div>
      <div>Year: {year}</div>
      <div>Month: {month}</div>
    </div>
  )
}

export default Home