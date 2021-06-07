import { Bill } from 'types/bill';
import BILLS from 'fictitiousData/bills';
import CATEGORIES from 'fictitiousData/categories';
import { BillSource } from 'adapters/billSource';
import { compareNumber, SortDirection } from '../utils';
import { getFormattedBills } from '../utils/billUtil';

const STORAGE_KEY = {
  BILL_LIST: 'BILL_LIST',
}

class LocalStorageClient implements BillSource {
  private getItem = (key: string): object | null => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  }

  private setItem = (key: string, value: object) => {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private getLocalBills() {
    const localBills = this.getItem(STORAGE_KEY.BILL_LIST) as Bill[];
    if (localBills) {
      return localBills;
    }
    const sortedList = BILLS.sort((bill1, bill2) =>
      compareNumber(bill1.time, bill2.time, SortDirection.Descending));
    const billList = getFormattedBills(sortedList, CATEGORIES);

    this.setItem(STORAGE_KEY.BILL_LIST, billList);
    return billList;
  }

  fetchBills(): Promise<Bill[] | null> {
    const localBills = this.getLocalBills();
    if (localBills) {
      return Promise.resolve(localBills);
    }
    return Promise.reject(null);
  }
}

export default new LocalStorageClient();



