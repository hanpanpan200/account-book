import { Category } from 'types/bill';
import { createBill } from 'utils/request';
import { isValidAmount } from '../../utils';

export const getBillInvalidMessage = (amount: string, selectedCategory?: Category): string | undefined => {
  if (!isValidAmount(amount)) {
    return '请填写正确的金额';
  }
  return selectedCategory ? undefined : '请选择支出类型';
}

export const createNewBill = (amount: string, selectedCategory: Category, date: Date) => {
  createBill({
    amount: parseFloat(amount),
    category: selectedCategory.id,
    time: date.getTime(),
    type: selectedCategory.type.id
  });
}
