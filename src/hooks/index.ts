import { useCallback, useState } from 'react';
import { getNow } from 'utils/dateUtil';

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
