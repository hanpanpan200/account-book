import { CategorizedBill, Category, RawBill } from 'types/bill';
import { getCategorizedBills, getFilteredRawBills, getPercentage, getRateString, getTotalAmount } from '../util';
import { BILL_TYPE } from '../../../constants';

describe('expenditure ranking test', () => {
  const category1: Category = { icon: 'test1.svg', id: '1', name: 'test category1', type: BILL_TYPE.EXPENDITURE };
  const category2: Category = { icon: 'test2.svg', id: '2', name: 'test category2', type: BILL_TYPE.EXPENDITURE };
  const rawBill1: RawBill = {
    amount: 20,
    category: '1',
    time: (new Date(2021, 1, 1)).getTime(),
    type: BILL_TYPE.EXPENDITURE.id
  };
  const rawBill2: RawBill = {
    amount: 80,
    category: '2',
    time: (new Date(2021, 2, 2)).getTime(),
    type: BILL_TYPE.EXPENDITURE.id
  };
  const rawBill3: RawBill = {
    amount: 0,
    category: '2',
    time: (new Date(2021, 3, 3)).getTime(),
    type: BILL_TYPE.EXPENDITURE.id
  };
  describe('getTotalAmount', () => {
    it('should return correct amount when getTotalAmount is called given rawBills are provided', () => {
      const rawBills: RawBill[] = [
        { amount: 1.0876, category: '0', time: (new Date(2021, 1, 1)).getTime(), type: 0 },
        { amount: 2.1245, category: '0', time: (new Date(2021, 1, 2)).getTime(), type: 0 }
      ]
      expect(getTotalAmount(rawBills)).toEqual(3.21);
    });
  });
  describe('getRateString', () => {
    it('should return correct rate when getRateString is called given params are provided', () => {
      const category: Category = {icon: 'test1.svg', id: '1', name: 'test category1', type: BILL_TYPE.EXPENDITURE };
      const categorizedBill: CategorizedBill = {
        category, rate: 0.8, totalAmount: 80, totalAmountCurrency: '80'
      };
      expect(getRateString(categorizedBill)).toEqual('80%');
    });
  });
  describe('getPercentage', () => {
    it('should return correct percentage when getPercentage is called given params are provided', () => {
      expect(getPercentage(0.8765432)).toEqual(87.65);
    });
  });
  describe('getCategorizedBills', () => {
    it('should return blank array when getCategorizedBills is called given rawBills are empty', () => {
      expect(getCategorizedBills([], [category1, category2], 0)).toEqual([]);
    });
    it('should return blank array when getCategorizedBills is called given categories are empty', () => {
      expect(getCategorizedBills([rawBill1, rawBill2], [], 0)).toEqual([]);
    });
    it('should return blank array when getCategorizedBills is called given categories are empty', () => {
      expect(getCategorizedBills([rawBill1, rawBill2, rawBill3], [category1, category2], 100)).toEqual(
        [
          {
            category: {
              icon: 'test2.svg',
              id: '2',
              name: 'test category2',
              type: {
                id: 0,
                name: '支出'
              }
            },
            rate: 0.8,
            totalAmount: 80,
            totalAmountCurrency: '¥80.00'
          },
          {
            category: {
              icon: 'test1.svg',
              id: '1',
              name: 'test category1',
              type: {
                id: 0,
                name: '支出'
              }
            },
            rate: 0.2,
            totalAmount: 20,
            totalAmountCurrency: '¥20.00'
          }
        ]
      );
    });
  });
  describe('getFilteredRawBills', () => {
    it('should return filtered raw bills when getFilteredRawBills is called given params are valid', () => {
      const filteredRawBills = getFilteredRawBills(
        [rawBill1, rawBill2, rawBill3],
        BILL_TYPE.EXPENDITURE.id,
        new Date(2021, 2, 2)
      );
      expect(filteredRawBills).toEqual([rawBill2]);
    });
    it('should return empty raw bills when getFilteredRawBills is called given rawBills are empty', () => {
      const filteredRawBills = getFilteredRawBills(
        [],
        BILL_TYPE.EXPENDITURE.id,
        new Date(2021, 2, 2)
      );
      expect(filteredRawBills).toEqual([]);
    });
  });
})