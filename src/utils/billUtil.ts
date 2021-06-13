import { add, divide, multiply, round } from 'mathjs';
import {
  Bill,
  BillGroup,
  BillType,
  CategorizedBill,
  Category,
  CategoryGroup,
  BillTypeName,
  FilterCondition,
  RawBill,
  Statistic
} from 'types/bill';
import { INVALID_CATEGORY } from '../constants';
import { getDate, getDateTime, getMonth, getTime, getYear, isSameMonth } from './dateUtil';
import { compareNumber, getCurrency, SortDirection } from './index';

export const getBills = (rawBills: RawBill[], categories: Category[]): Bill[] => {
  return rawBills.map((rawBill, index) => {
    const createdDateTime = getDateTime(rawBill.time);
    return {
      id: index,
      amount: rawBill.amount,
      currency: getCurrency(rawBill.amount, rawBill.type),
      category: categories.find(category => category.id === rawBill.category) || INVALID_CATEGORY,
      type: rawBill.type,
      createdDateTime,
      createdTime: getTime(createdDateTime)
    }
  });
}

export const getTotalAmount = (rawBills: RawBill[]) =>
  rawBills.reduce((sum, bill) => {
    return add(sum, bill.amount) as number
  }, 0);

export const getBillGroupBy = (bills: Bill[], filterCondition: FilterCondition) => {
  const filteredBills = getFilteredBillsBy(bills, filterCondition);
  return getGroupedBillBy(filteredBills);
}

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
}

export const getStatisticsBy = (bills: Bill[], date: Date, defaultStatistic: Statistic) => {
  const reducer = (statistic: Statistic, bill: Bill) => {
      if (!isSameMonth(date, bill.createdDateTime)) return statistic;

      if (bill.type === BillType.Income) {
        statistic.totalIncome = add(statistic.totalIncome, bill.amount) as number;
      }
      if (bill.type === BillType.Expenditure) {
        statistic.totalExpenditure = add(statistic.totalExpenditure, bill.amount) as number;
      }
      return statistic;
  }
  return bills.reduce(reducer, { ...defaultStatistic });
};

export const getFilteredRawBills = (rawBills: RawBill[], billType: BillType, date: Date): RawBill[] => {
  if (!rawBills || rawBills.length === 0) return [];

  return rawBills.filter(rawBill => {
    const createdTime = new Date(rawBill.time);
    const createdYear = getYear(createdTime);
    const createdMonth = getMonth(createdTime);
    return rawBill.type === billType && createdYear === getYear(date) && createdMonth === getMonth(date);
  })
};

const getFilteredBillsBy = (bills: Bill[], filter: FilterCondition): Bill[] => {
  if (!bills || bills.length === 0) return [];
  const { date, category } = filter;
  if (category) {
    return bills.filter(bill => isSameMonth(date, bill.createdDateTime) && bill.category.id === category);
  }
  return bills.filter(bill => isSameMonth(date, bill.createdDateTime));
}

export const getGroupedBillBy = (bills: Bill[]): BillGroup => {
  if (!bills || bills.length === 0) return {};

  const reducer = (billGroup: BillGroup, bill: Bill) => {
    const { createdDateTime } = bill;
    const targetKey = `${getMonth(createdDateTime)}月${getDate(createdDateTime)}日`;
    if (billGroup[targetKey]) {
      billGroup[targetKey] = [...billGroup[targetKey], bill];
    } else {
      billGroup[targetKey] = [bill];
    }
    return billGroup;
  }
  return bills.reduce(reducer, {});
}

export const getCategoryGroup = (categories: Category[]): CategoryGroup => {
  if (!categories || categories.length === 0) return {};

  const reducer = (categoryGroup: CategoryGroup, category: Category) => {
    let targetKey;
    switch (category.type) {
      case BillType.Income:
        targetKey = BillTypeName.Income;
        break;
      case BillType.Expenditure:
        targetKey = BillTypeName.Expenditure;
        break;
      default:
        targetKey = BillTypeName.Unknown;
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

export const getRateString = (categorizedBill: CategorizedBill) =>
  `${round(multiply(categorizedBill.rate, 100), 2)}%`;

export const getPercentage = (rate: number) => round(multiply(rate, 100), 2);