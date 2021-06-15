import { renderHook, act } from '@testing-library/react-hooks';
import { useCategoryGroup, useDateFilter, useInitialCategories, useOnOffToggle } from './index';
import { BILL_TYPE } from '../constants';
import salaryIcon from '../assets/icons/salary.svg';
import carLoanIcon from '../assets/icons/car-loan.svg';

jest.mock('utils/request', () => ({
  fetchCategories: () => Promise.resolve([]),
}));

describe('hooks', () => {
  it('should handle toggle status', () => {
    const { result } = renderHook(() => useOnOffToggle(true));
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBeFalsy();
  });
  it('should handle date change correctly', () => {
    const date1 = new Date(2021, 6, 14);
    const { result } = renderHook(() => useDateFilter(date1));
    expect(result.current[0]).toEqual(date1);
    const date2 = new Date(2021, 6, 15);
    act(() => {
      result.current[1](date2);
    });
    expect(result.current[0]).toEqual(date2);
  });
  it('should init category group correctly', () => {
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
    const categories = [category1, category2];
    const { result } = renderHook(() => useCategoryGroup(categories));
    expect(result.current).toEqual({
      '收入': [ { id: '1', type: { id: 1, name: '收入' }, name: '工资', icon: 'salary.svg' } ],
      '支出': [ { id: '2', type: { id: 0, name: '支出' }, name: '车贷', icon: 'car-loan.svg' } ]
    });
  });
  it('should init categories correctly', async () => {
    const { waitForNextUpdate, result } = renderHook(() => useInitialCategories());
    await waitForNextUpdate();
    expect(result.current).toEqual([]);
  });
});