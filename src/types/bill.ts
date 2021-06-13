export interface BillType {
  id: number
  name: string
}

export type BillTypeKey = number

export interface Category {
  id: string
  name: string
  type: BillType
  icon: string
}

export interface RawBill {
  type: BillTypeKey,
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