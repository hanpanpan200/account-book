import { Category, RawBill } from 'types/bill';

export interface DataSourceAdapter {
  fetchBills(): Promise<RawBill[] | null>;
  fetchCategories(): Promise<Category[] | null>;
}