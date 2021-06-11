import { BillType, CategoryTypeName, FilterCondition, GroupCondition, RawBill } from 'types/bill';
import { getBillGroupBy, getBills, getCategoryGroup, getStatisticsBy } from '../billUtil';
import { DEFAULT_STATISTICS } from '../../constants';
import carLoanIcon from 'assets/icons/car-loan.svg';
import salaryIcon from 'assets/icons/salary.svg';
import otherIcon from 'assets/icons/other.svg';

jest.mock('fictitiousData/categories', () => ([
  { id: '1', type: 0, name: '车贷', icon: '' },
  { id: '2', type: 0, name: '车辆保养', icon: '' },
]));

const rawBills: RawBill[] = [
  { type: 0, time: 1561910400000, category: '1', amount: 5400 },
  { type: 0, time: 1561910400000, category: '2', amount: 1500 },
];

const categoryFilterCondition: FilterCondition = { month: 7, year: 2019, category: '1' };
const nonCategoryFilterCondition: FilterCondition = { month: 7, year: 2019 };
const dateGroup = GroupCondition.Date;
const categoryGroup = GroupCondition.Category;

const bill1 = {
  amount: 5400,
  currency: '-¥5,400.00',
  category: {
    id: '1',
    name: '车贷',
    type: 0,
    icon: ''
  },
  day: 1,
  id: 0,
  month: 7,
  time: '24:00',
  type: 0,
  year: 2019
}

const bill2 = {
  amount: 1500,
  currency: '-¥1,500.00',
  category: {
    id: '2',
    name: '车辆保养',
    type: 0,
    icon: ''
  },
  day: 1,
  id: 1,
  month: 7,
  time: '24:00',
  type: 0,
  year: 2019
}

const bills = [bill1, bill2];

describe('getBills', () => {
  it('should return bill view model when getBills is called given params are provided ', () => {
    expect(getBills(rawBills)).toEqual([ bill1, bill2 ]);
  });
});

describe('getBillGroupBy', () => {
  it('should return blank group when getBillGroupBy is called given rawBills are blank', () => {
    const billGroup = getBillGroupBy([], nonCategoryFilterCondition, dateGroup);
    expect(billGroup).toEqual({});
  });
  it('should return blank group when getBillGroupBy is called given not match filters', () => {
    const billGroup = getBillGroupBy(bills,
      {...categoryFilterCondition, category: 'wrongCategory'}, dateGroup);
    expect(billGroup).toEqual({});
  });
  it('should return blank group when getBillGroupBy is called given rawBill category is invalid and group condition is Category', () => {
    const billGroup = getBillGroupBy([{...bill2, category: {
        id: 'UNKNOWN',
        name: '其他',
        type: 2,
        icon: 'other.svg'
      }}], nonCategoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({ '其他': [
      {
        amount: 1500,
        currency: '-¥1,500.00',
        category: {
          id: 'UNKNOWN',
          name: '其他',
          type: 2,
          icon: "other.svg"
        },
        day: 1,
        id: 1,
        month: 7,
        time: '24:00',
        type: 0,
        year: 2019
      },
    ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(bills, categoryFilterCondition, dateGroup);
    expect(billGroup).toEqual({'7月1日': [ bill1 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is not provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(bills, nonCategoryFilterCondition, dateGroup);
    expect(billGroup).toEqual({'7月1日': [ bill1, bill2 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is provided and group condition is Category', () => {
    const billGroup = getBillGroupBy(bills, categoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({'车贷': [ bill1 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is not provided and group condition is Category', () => {
    const billGroup = getBillGroupBy(bills, nonCategoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({'车贷': [ bill1 ], '车辆保养': [ bill2 ] });
  });
});

describe('getCategoryGroup', () => {
  const category1 = {
    id: '1',
    type: BillType.Income,
    name: '工资',
    icon: salaryIcon,
  }
  const category2 = {
    id: '2',
    type: BillType.Expenditure,
    name: '车贷',
    icon: carLoanIcon,
  }
  const category3 = {
    id: '3',
    type: BillType.Unknown,
    name: '未知类别',
    icon: otherIcon,
  }

  it('should return blank when getCategoryGroup given categories are empty', () => {
    expect(getCategoryGroup([])).toEqual({});
  });
  it('should return blank when getCategoryGroup given categories are provided', () => {
    expect(getCategoryGroup([category1, category2, category3])).toEqual({
      [CategoryTypeName.Income]: [category1],
      [CategoryTypeName.Expenditure]: [category2],
      [CategoryTypeName.Unknown]: [category3],
    });
  });
});

describe('getStatisticsBy', () => {
  it('should return default statistics when getStatistics is called given bills are blank', () => {
    expect(getStatisticsBy([], new Date(), DEFAULT_STATISTICS)).toEqual(DEFAULT_STATISTICS);
  });
  it('should return statistics when getStatistics is called given params are provided', () => {
    const date = new Date(bill1.year, bill1.month - 1);
    expect(getStatisticsBy(bills, date, DEFAULT_STATISTICS)).toEqual({
      totalExpenditure: bill1.amount + bill2.amount,
      totalIncome: 0,
    });
  });
});