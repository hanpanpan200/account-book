import { useMemo } from 'react';
import { BillType, CategoryGroup } from 'types/bill';
import { getFullDateString } from 'utils/dateUtil';

export const useCategoriesForType = (categoryGroup: CategoryGroup, billType: BillType) => useMemo(
  () => categoryGroup[billType.name] || [],
  [categoryGroup, billType]
);

export const useFullDate = (date: Date) => useMemo(() => getFullDateString(date), [date]);