import { BillType, CategoryTypeName, FilterCondition, RawBill } from 'types/bill';
import { getBillGroupBy, getBills, getCategoryGroup, getStatisticsBy } from '../billUtil';
import { DEFAULT_STATISTIC } from '../../constants';
import carLoanIcon from 'assets/icons/car-loan.svg';
import carMaintenanceIcon from 'assets/icons/car-maintenance.svg';
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

const categoryFilterCondition: FilterCondition = { date: new Date(2019, 6), category: '1' };
const nonCategoryFilterCondition: FilterCondition = { date: new Date(2019, 6) };

const bill1 = {
  amount: 5400,
  currency: '-¥5,400.00',
  category: {
    id: '1',
    name: '车贷',
    type: 0,
    icon: 'car-loan.svg'
  },
  id: 0,
  type: 0,
  createdDateTime: new Date(2019, 6),
  createdTime: '24:00',
}

const bill2 = {
  amount: 1500,
  currency: '-¥1,500.00',
  category: {
    id: '2',
    name: '车辆保养',
    type: 0,
    icon: 'car-maintenance.svg'
  },
  id: 1,
  type: 0,
  createdDateTime: new Date(2019, 6),
  createdTime: '24:00'
}

const bills = [bill1, bill2];

describe('getBills', () => {
  it('should return bill view model when getBills is called given params are provided ', () => {
    const category1 = {
      id: '1',
      type: BillType.Expenditure,
      name: '车贷',
      icon: carLoanIcon,
    }
    const category2 = {
      id: '2',
      type: BillType.Expenditure,
      name: '车辆保养',
      icon: carMaintenanceIcon,
    }
    expect(getBills(rawBills, [category1, category2])).toEqual([ bill1, bill2 ]);
  });
});

describe('getBillGroupBy', () => {
  it('should return blank group when getBillGroupBy is called given rawBills are blank', () => {
    const billGroup = getBillGroupBy([], nonCategoryFilterCondition);
    expect(billGroup).toEqual({});
  });
  it('should return blank group when getBillGroupBy is called given not match filters', () => {
    const billGroup = getBillGroupBy(bills,
      {...categoryFilterCondition, category: 'wrongCategory'});
    expect(billGroup).toEqual({});
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(bills, categoryFilterCondition);
    expect(billGroup).toEqual({'7月1日': [ bill1 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is not provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(bills, nonCategoryFilterCondition);
    expect(billGroup).toEqual({'7月1日': [ bill1, bill2 ] });
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
    expect(getStatisticsBy([], new Date(), DEFAULT_STATISTIC)).toEqual(DEFAULT_STATISTIC);
  });
  it('should return statistics when getStatistics is called given params are provided', () => {
    expect(getStatisticsBy(bills, bill1.createdDateTime, DEFAULT_STATISTIC)).toEqual({
      totalExpenditure: bill1.amount + bill2.amount,
      totalIncome: 0,
    });
  });
});