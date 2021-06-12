import { useEffect, useMemo, useState } from 'react';
import { fetchBills } from 'utils/request';
import { BillType, Category, RawBill } from 'types/bill';
import { getCategorizedBills, getFilteredRawBills, getTotalAmount } from 'utils/billUtil';
import { getCurrency } from 'utils';

export const useExpenditureRawBillsForSelectedMonth = (date: Date): RawBill[] => {
  const [expenditureBillsForMonth, setExpenditureBillsForMonth] = useState<RawBill[]>([]);
  useEffect(() => {
    fetchBills().then(rawBills => {
      if (rawBills) {
        const targetRawBills = getFilteredRawBills(rawBills, BillType.Expenditure, date);
        setExpenditureBillsForMonth(targetRawBills);
      }
    }).catch(() => {
      console.log('Load raw bills failed');
    });
  }, [date]);
  return expenditureBillsForMonth;
}

export const useTotalExpenditureCurrency = (totalAmount: number): string =>
  useMemo(() => getCurrency(totalAmount), [totalAmount]);

export const useTotalExpenditureAmount = (rawBills: RawBill[]): number =>
  useMemo(() => getTotalAmount(rawBills), [rawBills]);

export const useCategorizedBills = (rawBills: RawBill[], categories: Category[], totalAmount: number) => {
  return useMemo(
    () => getCategorizedBills(rawBills, categories, totalAmount),
    [rawBills, categories, totalAmount]
  );
}
