import { add } from 'mathjs';
import { getDate, getDateTime, getMonth, getTime, isSameMonth } from 'utils/dateUtil';
import { Bill, BillGroup, Category, FilterCondition, RawBill, Statistic } from 'types/bill';
import { BILL_TYPE, INVALID_CATEGORY } from '../../constants';
import { getCurrency } from '../../utils';

export const getBills = (rawBills: RawBill[], categories: Category[]): Bill[] => {
  return rawBills.map((rawBill, index) => {
    const createdDateTime = getDateTime(rawBill.time);
    let billType = BILL_TYPE.UNKNOWN;
    if (rawBill.type === BILL_TYPE.INCOME.id) {
      billType = BILL_TYPE.INCOME
    }
    if (rawBill.type === BILL_TYPE.EXPENDITURE.id) {
      billType = BILL_TYPE.EXPENDITURE
    }
    return {
      id: index,
      amount: rawBill.amount,
      currency: getCurrency(rawBill.amount, billType),
      category: categories.find(category => category.id === rawBill.category) || INVALID_CATEGORY,
      type: billType,
      createdDateTime,
      createdTime: getTime(createdDateTime)
    }
  });
};

export const getStatisticsBy = (bills: Bill[], date: Date, defaultStatistic: Statistic) => {
  const reducer = (statistic: Statistic, bill: Bill) => {
    if (!isSameMonth(date, bill.createdDateTime)) return statistic;

    if (bill.type.id === BILL_TYPE.INCOME.id) {
      statistic.totalIncome = add(statistic.totalIncome, bill.amount) as number;
    }
    if (bill.type.id === BILL_TYPE.EXPENDITURE.id) {
      statistic.totalExpenditure = add(statistic.totalExpenditure, bill.amount) as number;
    }
    return statistic;
  }
  return bills.reduce(reducer, { ...defaultStatistic });
};

const getFilteredBillsBy = (bills: Bill[], filter: FilterCondition): Bill[] => {
  if (!bills || bills.length === 0) return [];
  const { date, category } = filter;
  if (category) {
    return bills.filter(bill => isSameMonth(date, bill.createdDateTime) && bill.category.id === category);
  }
  return bills.filter(bill => isSameMonth(date, bill.createdDateTime));
};

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
};

export const getBillGroupBy = (bills: Bill[], filterCondition: FilterCondition) => {
  const filteredBills = getFilteredBillsBy(bills, filterCondition);
  return getGroupedBillBy(filteredBills);
};
