export enum BillType {
  Expenditure,
  Income,
  Unknown,
}

export enum BillTypeName {
  Expenditure = '支出',
  Income = '收入',
  Unknown = '其他',
}

export interface Category {
  id: string
  name: string
  type: BillType
  icon: string
}

export interface RawBill {
  type: BillType,
  time: number
  category: string
  amount: number
}

export interface Bill {
  id: number
  amount: number
  currency: string
  category: Category
  type: BillType
  createdDateTime: Date
  createdTime: string
}

export type BillGroup = {[key: string]: Bill[]};

export type CategoryGroup = {[key: string]: Category[]};

export interface CategorizedBill {
  category: Category
  totalAmount: number
  totalAmountCurrency: string
  rate: number
}

export interface FilterCondition {
  category?: string
  date: Date
}

export interface Statistic {
  totalExpenditure: number
  totalIncome: number
}