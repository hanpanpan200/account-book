import { useEffect, useMemo, useState } from 'react';
import { Bill, Category, Statistic } from 'types/bill';
import { getCurrency } from 'utils';
import { fetchBills } from 'utils/request';
import { getBills, getStatisticsBy } from './util';
import { DEFAULT_STATISTIC } from '../../constants';

export const useInitialBills = (categories: Category[]): Bill[] => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    fetchBills().then((rawBills) => {
      if (rawBills) {
        const allBills = getBills(rawBills, categories);
        setBills(allBills);
      }
    }).catch(() => {
      console.log('load raw bills error.');
    });
  }, [categories]);

  return bills;
}

export const useMonthStatistic = (bills: Bill[], date: Date): Statistic => {
  const [statistic, setStatistic] = useState<Statistic>(DEFAULT_STATISTIC);
  useEffect(() => {
    if (!date) return;
    const statisticForSelectedMonth = getStatisticsBy(bills, date, DEFAULT_STATISTIC);
    setStatistic(statisticForSelectedMonth);
  }, [bills, date]);
  return statistic;
}

export const useCurrency = (amount: number): string => {
  return useMemo(
    () => getCurrency(amount), [amount]);
}