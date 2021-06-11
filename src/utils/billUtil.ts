import { add, divide, multiply, round } from 'mathjs';
import {
  Bill,
  BillGroup,
  BillType,
  CategorizedBill,
  Category,
  CategoryGroup,
  CategoryTypeName,
  FilterCondition,
  GroupCondition,
  RawBill,
  Statistic
} from 'types/bill';
import { INVALID_CATEGORY, LOCALE } from '../constants';
import { compareNumber, getCurrency, getDate, getMonth, getYear, SortDirection } from './index';
import { getTime } from './dateUtil';

export const getBills = (rawBills: RawBill[], categories: Category[]): Bill[] => {
  return rawBills.map((rawBill, index) => {
    const createdTime = getTime(rawBill.time);
    return {
      id: index,
      amount: rawBill.amount,
      currency: getCurrency(rawBill.amount, rawBill.type),
      category: categories.find(category => category.id === rawBill.category) || INVALID_CATEGORY,
      type: rawBill.type,
      year: getYear(createdTime),
      month: getMonth(createdTime),
      day: getDate(createdTime),
      time: createdTime.toLocaleTimeString(LOCALE, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    }
  });
}

export const getTotalAmount = (rawBills: RawBill[]) =>
  rawBills.reduce((sum, bill) => {
    return add(sum, bill.amount) as number
  }, 0);

export const getBillGroupBy = (bills: Bill[], filterCondition: FilterCondition, groupCondition: GroupCondition) => {
  const filteredBills = getFilteredBillsBy(bills, filterCondition);
  return getGroupedBillBy(filteredBills, groupCondition);
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
      if (bill.year !== getYear(date) || bill.month !== getMonth(date)) return statistic;

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
  const { year, month, category } = filter;
  if (category) {
    return bills.filter(bill => bill.month === month && bill.year === year && bill.category.id === category);
  }
  return bills.filter(bill => bill.month === month && bill.year === year);
}

export const getGroupedBillBy = (bills: Bill[], groupCondition: GroupCondition): BillGroup => {
  if (!bills || bills.length === 0) return {};

  const reducer = (billGroup: BillGroup, bill: Bill) => {
    const targetKey = groupCondition === GroupCondition.Date ? `${bill.month}月${bill.day}日` : bill.category.name;
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
        targetKey = CategoryTypeName.Income;
        break;
      case BillType.Expenditure:
        targetKey = CategoryTypeName.Expenditure;
        break;
      default:
        targetKey = CategoryTypeName.Unknown;
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