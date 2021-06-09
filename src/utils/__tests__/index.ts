import { compareNumber, getCurrency, getMonth, getYear, SortDirection } from '../index';
jest.mock('')

describe('compareNumber', () => {
  it('should return -1 when compare 1 and 2 given sort direction is Descending', () => {
    expect(compareNumber(1, 2, SortDirection.Descending)).toEqual(-1);
  });
  it('should return 1 when compare 1 and 2 given sort direction is Ascending', () => {
    expect(compareNumber(1, 2, SortDirection.Ascending)).toEqual(1);
  });
})

describe('getCurrency', () => {
  it('should return currency format for number when getCurrency is called given params are provided', () => {
    expect(getCurrency(333333)).toEqual('¥333,333.00');
  });
});

describe('getYear', () => {
  const date = new Date(2021, 6);
  expect(getYear(date)).toEqual(2021);
})

describe('getMonth', () => {
  const date = new Date(2021, 5);
  expect(getMonth(date)).toEqual(6);
})