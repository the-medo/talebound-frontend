import React, { useCallback, useState } from 'react';

type ValueType = string | number;

interface UseInputResponse<T extends ValueType> {
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = <T extends ValueType>(initialValue: T): UseInputResponse<T> => {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'number') {
      setValue(parseFloat(e.target.value) as T);
    } else {
      setValue(e.target.value as T);
    }
  }, []);

  return {
    value,
    onChange,
  };
};
