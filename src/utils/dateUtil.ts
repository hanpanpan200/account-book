import { LOCALE } from '../constants';

export const getDateTime = (timestamp?: number) => {
  if (timestamp) return new Date(timestamp);
  return new Date();
}

export const getNow = ():Date => getDateTime();

export const getYear = (date: Date) => date.getFullYear();

export const getDate = (date: Date) => date.getDate();

export const getMonth = (date: Date) => date.getMonth() + 1;

export const isSameMonth = (date1: Date, date2: Date) =>
  getYear(date1) === getYear(date2) && getMonth(date1) === getMonth(date2);

export const getTime = (date: Date) => {
  return date.toLocaleTimeString(LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}
