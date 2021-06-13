import { BillType, Category, CategoryGroup } from 'types/bill';
import { BILL_TYPE, LOCALE } from '../constants';

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
  switch (type?.id) {
    case BILL_TYPE.EXPENDITURE.id:
      label = '-';
      break;
    case BILL_TYPE.INCOME.id:
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

export const getCategoryGroup = (categories: Category[]): CategoryGroup => {
  if (!categories || categories.length === 0) return {};

  const reducer = (categoryGroup: CategoryGroup, category: Category) => {
    let targetKey;
    switch (category.type.id) {
      case BILL_TYPE.INCOME.id:
        targetKey = BILL_TYPE.INCOME.name;
        break;
      case BILL_TYPE.EXPENDITURE.id:
        targetKey = BILL_TYPE.EXPENDITURE.name;
        break;
      default:
        targetKey = BILL_TYPE.UNKNOWN.name;
        break;
    }
    if (categoryGroup[targetKey]) {
      categoryGroup[targetKey] = [...categoryGroup[targetKey], category];
    } else {
      categoryGroup[targetKey] = [category];
    }
    return categoryGroup;
  }
  return categories.reduce(reducer, {});
}