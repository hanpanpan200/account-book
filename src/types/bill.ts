export enum BillType {
  Expenditure,
  Income,
  Unknown,
}

export interface Category {
  id: string
  name: string
  type: BillType
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
  year: number
  month: number
  day: number
  time: string
}

export type BillGroup = {[key: string]: Bill[]};

export interface FilterCondition {
  category?: string
  year: number
  month: number
}

export enum GroupCondition {
  Date,
  Category,
}