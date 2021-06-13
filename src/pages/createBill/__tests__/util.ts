import { Category } from 'types/bill';
import { createBill } from 'utils/request';
import { createNewBill, getBillInvalidMessage } from '../util';
import { BILL_TYPE } from '../../../constants';

jest.mock('utils/request');

describe('create bill util', () => {
  const category: Category = {icon: 'test.svg', id: '1', name: 'test category', type: BILL_TYPE.INCOME };

  describe('getBillInvalidMessage', () => {
    it('should return error message when getBillInvalidMessage is called given amount is invalid', () => {
      expect(getBillInvalidMessage('s33.cs45', category)).toEqual('请填写正确的金额');
    });
    it('should return error message when getBillInvalidMessage is called given category is empty', () => {
      expect(getBillInvalidMessage('123.456')).toEqual('请选择支出类型');
    });
    it('should return blank error message when getBillInvalidMessage is called given params are valid', () => {
      expect(getBillInvalidMessage('105.12', category)).toBeUndefined();
    });
  });
  describe('createNewBill', () => {
    const createBillMock = createBill as jest.Mock
    it('should create bill correctly when createNewBill is called given params are valid', () => {
      const date = new Date(2021, 6, 13);
      createNewBill('100', category, date);
      expect(createBillMock).toBeCalledWith({
        amount: 100,
        category: '1',
        time: date.getTime(),
        type: 1
      });
    });
  })
});