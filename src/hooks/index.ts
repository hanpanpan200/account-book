import { useCallback, useEffect, useState } from 'react';
import { Category, CategoryGroup } from 'types/bill';
import { getNow } from 'utils/dateUtil';
import { fetchCategories } from 'utils/request';
import { getCategoryGroup } from '../utils';

type UseToggleResult = [boolean, () => void];

export const useOnOffToggle = (defaultValue: boolean): UseToggleResult => {
  const [isOn, setIsOn] = useState<boolean>(defaultValue);

  const handleToggled: () => void = useCallback(() => {
    setIsOn(!isOn);
  }, [isOn]);

  return [isOn, handleToggled];
}

type UseDateFilterResult = [Date, (date: Date) => void];
export const useDateFilter = (defaultValue?: Date):UseDateFilterResult => {
  const [date, setDate] = useState<Date>(defaultValue || getNow());
  return [date, setDate];
}

export const useCategoryGroup = (categories: Category[]): CategoryGroup => {
  const [categoryGroup, setCategoryGroup] = useState<CategoryGroup>({});
  useEffect(() => {
    setCategoryGroup(getCategoryGroup(categories));
  }, [categories]);
  return categoryGroup;
};

export const useInitialCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories().then(categoryList => {
      setCategories(categoryList);
    }).catch(() => {
      console.log('Load categories failed');
    })
  }, []);

  return categories;
}