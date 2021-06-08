import { FilterCondition, GroupCondition, RawBill } from 'types/bill';
import { getBillGroupBy, getBills } from '../billUtil';

jest.mock('fictitiousData/categories', () => ([
  { id: '1', type: 0, name: '车贷' },
  { id: '2', type: 0, name: '车辆保养' },
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
  currency: '¥5,400.00',
  category: {
    id: '1',
    name: '车贷',
    type: 0
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
  currency: '¥1,500.00',
  category: {
    id: '2',
    name: '车辆保养',
    type: 0
  },
  day: 1,
  id: 1,
  month: 7,
  time: '24:00',
  type: 0,
  year: 2019
}

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
    const billGroup = getBillGroupBy(rawBills,
      {...categoryFilterCondition, category: 'wrongCategory'}, dateGroup);
    expect(billGroup).toEqual({});
  });
  it('should return blank group when getBillGroupBy is called given rawBill category is invalid and group condition is Category', () => {
    const billGroup = getBillGroupBy([{
      type: 0,
      time: 1561910400000,
      category: 'wrongCategory',
      amount: 1500
    }], nonCategoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({ '其他': [
      {
        amount: 1500,
        currency: '¥1,500.00',
        category: {
          id: 'UNKNOWN',
          name: '其他',
          type: 2
        },
        day: 1,
        id: 0,
        month: 7,
        time: '24:00',
        type: 0,
        year: 2019
      },
    ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(rawBills, categoryFilterCondition, dateGroup);
    expect(billGroup).toEqual({'7月1日': [ bill1 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is not provided and group condition is Date', () => {
    const billGroup = getBillGroupBy(rawBills, nonCategoryFilterCondition, dateGroup);
    expect(billGroup).toEqual({'7月1日': [ bill1, bill2 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is provided and group condition is Category', () => {
    const billGroup = getBillGroupBy(rawBills, categoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({'车贷': [ bill1 ] });
  });
  it('should return bill group correctly when getBillGroupBy is called given category filter is not provided and group condition is Category', () => {
    const billGroup = getBillGroupBy(rawBills, nonCategoryFilterCondition, categoryGroup);
    expect(billGroup).toEqual({'车贷': [ bill1 ], '车辆保养': [ bill2 ] });
  });
})