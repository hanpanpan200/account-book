import { Category, Statistic } from 'types/bill';
import otherIcon from 'assets/icons/other.svg';

export const LOCALE = 'zh-Hans-CN';

export const BILL_TYPE = {
  EXPENDITURE: {
    id: 0, name: '支出'
  },
  INCOME: {
    id: 1, name: '收入'
  },
  UNKNOWN: {
    id: 3, name: '其他'
  },
}

export const INVALID_CATEGORY: Category = {
  id: 'UNKNOWN',
  name: '其他',
  type: BILL_TYPE.UNKNOWN,
  icon: otherIcon
}

export const DEFAULT_STATISTIC: Statistic = {
  totalExpenditure: 0,
  totalIncome: 0
}
