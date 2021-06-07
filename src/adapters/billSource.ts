import { Bill } from '../types/bill';

export interface BillSource {
  fetchBills(): Promise<Bill[] | null>;
}