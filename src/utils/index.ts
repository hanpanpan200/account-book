import { LOCALE } from '../constants';

export enum SortDirection {
  Ascending,
  Descending,
}
export const compareNumber = (number1: number, number2: number, direction: SortDirection) => {
  return direction === SortDirection.Descending ? number1 - number2 : number2 - number1;
}

export const getCurrency = (number: number): string => {
  const formatter = new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
  });
  return formatter.format(number);
}

