import {
  Bill,
  BillGroup,
  BillType,
  Category,
  CategoryGroup,
  CategoryTypeName,
  FilterCondition,
  GroupCondition,
  RawBill,
  Statistics
} from 'types/bill';
import CATEGORIES from 'fictitiousData/categories';
import { INVALID_CATEGORY, LOCALE } from '../constants';
import { getCurrency, getDate, getMonth, getYear } from './index';
import { getTime } from './dateUtil';

export const getBills = (rawBills: RawBill[]): Bill[] => {
  return rawBills.map((billData, index) => {
    const createdTime = getTime(billData.time);
    return {
      id: index,
      amount: billData.amount,
      currency: getCurrency(billData.amount, billData.type),
      category: CATEGORIES.find(category => category.id === billData.category) || INVALID_CATEGORY,
      type: billData.type,
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

export const getBillGroupBy = (bills: Bill[], filterCondition: FilterCondition, groupCondition: GroupCondition) => {
  const filteredBills = getFilteredBillsBy(bills, filterCondition);
  return getGroupedBillBy(filteredBills, groupCondition);
}

export const getStatisticsBy = (bills: Bill[], date: Date, defaultStatistics: Statistics) => {
  const reducer = (info: Statistics, bill: Bill) => {
      if (bill.year !== getYear(date) || bill.month !== getMonth(date)) return info;

      if (bill.type === BillType.Income) {
        info.totalIncome += bill.amount;
      }
      if (bill.type === BillType.Expenditure) {
        info.totalExpenditure += bill.amount;
      }
      return info;
  }
  return bills.reduce(reducer, { ...defaultStatistics });
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