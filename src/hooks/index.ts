import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrency } from 'utils';
import { getNow } from 'utils/dateUtil';
import { fetchBills } from 'utils/request';
import { getBills, getStatisticsBy } from 'utils/billUtil';
import { Bill, Category, Statistic } from 'types/bill';
import { DEFAULT_STATISTIC } from '../constants';

type UseToggleResult = [boolean, () => void];

export const useOnOffToggle = (defaultValue: boolean): UseToggleResult => {
  const [isOn, setIsOn] = useState<boolean>(defaultValue);

  const handleToggled: () => void = useCallback(() => {
    setIsOn(!isOn);
  }, [isOn]);

  return [isOn, handleToggled];
}

type UseDateFilterResult = [Date, (date: Date) => void];
export const useDateFilter = (defaultValue?: Date):UseDateFilterResult => {
  const [date, setDate] = useState<Date>(defaultValue || getNow());
  return [date, setDate];
}

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