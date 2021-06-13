import { BillType, Category } from 'types/bill';
import { LOCALE } from '../constants';
import { createBill } from './request';

export enum SortDirection {
  Ascending,
  Descending,
}
export const compareNumber = (number1: number, number2: number, direction: SortDirection) => {
  return direction === SortDirection.Ascending ? number1 - number2 : number2 - number1;
}

export const getCurrency = (number: number, type?: BillType): string => {
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  });
  let label = '';
  switch (type) {
    case BillType.Expenditure:
      label = '-';
      break;
    case BillType.Income:
      label = '+';
      break;
    default:
      break;
  }
  return `${label}${formatter.format(number)}`;
}

export const isValidAmount = (input: string) => {
  const floatReg = /^\d+.\d+$/;
  const integerReg = /^\d+$/;
  return floatReg.test(input) || integerReg.test(input)
}

export const getBillInvalidMessage = (amount: string, selectedCategory?: Category): string | undefined => {
  if (!isValidAmount(amount)) {
    return '请填写正确的金额';
  }
  return selectedCategory ? undefined : '请选择支出类型';
}

export const createNewBill = (amount: string, selectedCategory: Category, date: Date) => {
  createBill({
    amount: parseFloat(amount),
    category: selectedCategory.id,
    time: date.getTime(),
    type: selectedCategory.type
  });
}