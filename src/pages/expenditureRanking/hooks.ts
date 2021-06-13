import { useEffect, useMemo, useState } from 'react';
import { fetchBills } from 'utils/request';
import { CategorizedBill, Category, RawBill } from 'types/bill';
import { getCategorizedBills, getFilteredRawBills, getTotalAmount } from 'utils/billUtil';
import { getCurrency } from 'utils';
import { BILL_TYPE } from '../../constants';

export const useExpenditureRawBillsForSelectedMonth = (date: Date): RawBill[] => {
  const [expenditureBillsForMonth, setExpenditureBillsForMonth] = useState<RawBill[]>([]);
  useEffect(() => {
    fetchBills().then(rawBills => {
      if (rawBills) {
        const targetRawBills = getFilteredRawBills(rawBills, BILL_TYPE.EXPENDITURE.id, date);
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

export const useCategorizedBills =
  (rawBills: RawBill[], categories: Category[], totalAmount: number): CategorizedBill[] =>
    useMemo(
      () => getCategorizedBills(rawBills, categories, totalAmount),
      [rawBills, categories, totalAmount]
    );
