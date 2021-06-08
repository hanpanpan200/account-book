import { RawBill } from 'types/bill';

export interface BillSource {
  fetchBills(): Promise<RawBill[] | null>;
}