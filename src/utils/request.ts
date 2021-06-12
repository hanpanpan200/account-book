import client from 'adapters/localStorageClient';
import { RawBill } from 'types/bill';

export const fetchBills = () => client.fetchBills();

export const fetchCategories = () => client.fetchCategories();

export const createBill = (rawBill: RawBill) => client.createBill(rawBill);