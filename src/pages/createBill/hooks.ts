import { CategoryGroup, BillTypeName } from 'types/bill';
import { useMemo } from 'react';
import { getFullDateString } from '../../utils/dateUtil';

export const useCategoriesForType = (categoryGroup: CategoryGroup, billTypeName: BillTypeName) => useMemo(
  () => categoryGroup[billTypeName.toString()] || [],
  [categoryGroup, billTypeName]
);

export const useFullDate = (date: Date) => useMemo(() => getFullDateString(date), [date]);