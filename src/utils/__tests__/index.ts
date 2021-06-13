import { compareNumber, getCategoryGroup, getCurrency, SortDirection } from '../index';
import carLoanIcon from 'assets/icons/car-loan.svg';
import salaryIcon from 'assets/icons/salary.svg';
import otherIcon from 'assets/icons/other.svg';
import { BILL_TYPE } from '../../constants';

describe('util', () => {
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
      expect(getCurrency(333333, BILL_TYPE.EXPENDITURE)).toEqual('-¥333,333.00');
    });
    it('should return currency format for number when getCurrency is called given bill type is income', () => {
      expect(getCurrency(333333, BILL_TYPE.INCOME)).toEqual('+¥333,333.00');
    });
    it('should return currency format for number when getCurrency is called given bill type is unknown', () => {
      expect(getCurrency(333333, BILL_TYPE.UNKNOWN)).toEqual('¥333,333.00');
    });
  });

  describe('getCategoryGroup', () => {
    const category1 = {
      id: '1',
      type: BILL_TYPE.INCOME,
      name: '工资',
      icon: salaryIcon,
    }
    const category2 = {
      id: '2',
      type: BILL_TYPE.EXPENDITURE,
      name: '车贷',
      icon: carLoanIcon,
    }
    const category3 = {
      id: '3',
      type: BILL_TYPE.UNKNOWN,
      name: '未知类别',
      icon: otherIcon,
    }

    it('should return blank when getCategoryGroup given categories are empty', () => {
      expect(getCategoryGroup([])).toEqual({});
    });
    it('should return blank when getCategoryGroup given categories are provided', () => {
      expect(getCategoryGroup([category1, category2, category3])).toEqual({
        [BILL_TYPE.INCOME.name]: [category1],
        [BILL_TYPE.EXPENDITURE.name]: [category2],
        [BILL_TYPE.UNKNOWN.name]: [category3],
      });
    });
  });
});