import { BillType } from 'types/bill';
import { compareNumber, getCurrency, SortDirection } from '../index';

describe('compareNumber', () => {
  it('should return -1 when compare 1 and 2 given sort direction is Descending', () => {
    expect(compareNumber(1, 2, SortDirection.Descending)).toEqual(1);
  });
  it('should return 1 when compare 1 and 2 given sort direction is Ascending', () => {
    expect(compareNumber(1, 2, SortDirection.Ascending)).toEqual(-1);
  });
})

describe('getCurrency', () => {
  it('should return currency format for number when getCurrency is called given bill type is expenditure', () => {
    expect(getCurrency(333333, BillType.Expenditure)).toEqual('-¥333,333.00');
  });
  it('should return currency format for number when getCurrency is called given bill type is income', () => {
    expect(getCurrency(333333, BillType.Income)).toEqual('+¥333,333.00');
  });
  it('should return currency format for number when getCurrency is called given bill type is unknown', () => {
    expect(getCurrency(333333, BillType.Unknown)).toEqual('¥333,333.00');
  });
});
