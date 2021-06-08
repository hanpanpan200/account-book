import BILLS from 'fictitiousData/bills';
import { DataSourceAdapter } from 'adapters/dataSourceAdapter';
import { Category, RawBill } from 'types/bill';
import { compareNumber, SortDirection } from 'utils';
import CATEGORIES from '../fictitiousData/categories';

const STORAGE_KEY = {
  BILL_LIST: 'BILL_LIST',
  CATEGORY_LIST: 'CATEGORY_LIST',
}

class LocalStorageClient implements DataSourceAdapter {
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
    const localBills = this.getItem(STORAGE_KEY.BILL_LIST) as RawBill[];
    if (localBills) {
      return localBills;
    }
    const sortedList = BILLS.sort((bill1, bill2) =>
      compareNumber(bill1.time, bill2.time, SortDirection.Descending));
    this.setItem(STORAGE_KEY.BILL_LIST, sortedList);
    return sortedList;
  }

  private getLocalCategories() {
    const localCategories = this.getItem(STORAGE_KEY.CATEGORY_LIST) as Category[];
    if (localCategories) {
      return localCategories;
    }

    this.setItem(STORAGE_KEY.CATEGORY_LIST, CATEGORIES);
    return CATEGORIES;
  }

  fetchBills(): Promise<RawBill[] | null> {
    const localBills = this.getLocalBills();
    if (localBills) {
      return Promise.resolve(localBills);
    }
    return Promise.reject(null);
  }

  fetchCategories(): Promise<Category[] | null> {
    const localCategories = this.getLocalCategories();
    if (localCategories) return Promise.resolve(localCategories);
    return Promise.reject(null);
  }
}

export default new LocalStorageClient();



