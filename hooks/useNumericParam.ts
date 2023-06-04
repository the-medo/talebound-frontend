import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useNumericParam = (paramName: string): number | undefined => {
  const router = useRouter();
  // router.query.id will hold the value of id from the URL
  return useMemo(() => {
    const value = router.query[paramName];
    let result = 0;

    if (typeof value === 'string') {
      result = parseInt(value, 10);
    }

    if (result > 0) return result;
    return undefined;
  }, [paramName, router.query]);
};

export default useNumericParam;
