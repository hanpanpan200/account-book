import { add, divide, multiply, round } from 'mathjs';
import { compareNumber, getCurrency, SortDirection } from 'utils';
import { BillTypeKey, CategorizedBill, Category, RawBill } from '../../types/bill';
import { getMonth, getYear } from '../../utils/dateUtil';

export const getCategorizedBills =
  (rawBills: RawBill[], categories: Category[], totalExpenditure: number): CategorizedBill[] => {
    if (!categories || categories.length === 0 || !rawBills || rawBills.length === 0) return [];

    const categorizedBills = categories.map(category => {
      const billsForCategory = rawBills.filter(rawBill => rawBill.category === category.id);
      const totalAmount = getTotalAmount(billsForCategory);
      return {
        category: category,
        totalAmount,
        totalAmountCurrency: getCurrency(totalAmount),
        rate: round(divide(totalAmount, totalExpenditure), 4)
      } as CategorizedBill
    });

    return categorizedBills
      .filter(bill => bill.totalAmount > 0)
      .sort((bill1, bill2) =>
        compareNumber(bill1.totalAmount, bill2.totalAmount, SortDirection.Descending)
      );
  };

export const getFilteredRawBills = (rawBills: RawBill[], billType: BillTypeKey, date: Date): RawBill[] => {
  if (!rawBills || rawBills.length === 0) return [];

  return rawBills.filter(rawBill => {
    const createdTime = new Date(rawBill.time);
    const createdYear = getYear(createdTime);
    const createdMonth = getMonth(createdTime);
    return rawBill.type === billType && createdYear === getYear(date) && createdMonth === getMonth(date);
  })
};

export const getTotalAmount = (rawBills: RawBill[]) => {
  const totalAmount = rawBills.reduce((sum, bill) => {
    return add(sum, bill.amount) as number
  }, 0);
  return round(totalAmount, 2);
}


export const getRateString = (categorizedBill: CategorizedBill) =>
  `${round(multiply(categorizedBill.rate, 100), 2)}%`;

export const getPercentage = (rate: number) => round(multiply(rate, 100), 2);