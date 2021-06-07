import { RawBill } from 'fictitiousData/bills';
import { LOCALE } from '../constants';
import { Bill, Category } from 'types/bill';
import { getCurrency } from './index';

export const getFormattedBills = (rawBills: RawBill[], categories: Category[]): Bill[] => {
  return rawBills.map((billData, index) => {
    const createdTime = new Date(billData.time);
    return {
      id: index,
      amount: getCurrency(billData.amount),
      category: categories.find(category => category.id === billData.category),
      type: billData.type,
      year: createdTime.getFullYear(),
      month: createdTime.getMonth() + 1,
      day: createdTime.getDay(),
      time: createdTime.toLocaleTimeString(LOCALE, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    }
  });
}