export enum BillType {
  Expenditure,
  Income
}

export interface Category {
  id: string
  name: string
  type: BillType
}

export interface Bill {
  id: number
  amount: string
  category: Category | undefined
  type: BillType
  year: number
  month: number
  day: number
  time: string
}