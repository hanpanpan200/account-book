import { useCallback, useEffect, useMemo, useState } from 'react';
import client from 'adapters/localStorageClient';
import { getCurrency } from 'utils';
import { getNow } from 'utils/dateUtil';
import { getBills, getStatisticsBy } from 'utils/billUtil';
import { Bill, Statistic } from 'types/bill';
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

export const useInitialBills = (): Bill[] => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    client.fetchBills().then((rawBills) => {
      if (rawBills) {
        const allBills = getBills(rawBills);
        setBills(allBills);
      }
    }).catch(() => {
      console.log('load raw bills error.');
    });
  }, []);

  return bills;
}

export const useStatistic = (bills: Bill[], date: Date): Statistic => {
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