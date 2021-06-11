import { useCallback, useState } from 'react';

type UseToggleResult = [boolean, () => void];

export const useOnOffToggle = (defaultValue: boolean): UseToggleResult => {
  const [isOn, setIsOn] = useState<boolean>(defaultValue);

  const handleToggled: () => void = useCallback(() => {
    setIsOn(!isOn);
  }, [isOn]);

  return [isOn, handleToggled];
}