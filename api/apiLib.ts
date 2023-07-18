export type InfiniteResponse<T> = T & { newOffset: number | undefined };

export const expandDataForInfiniteQuery = <T>(
  data: T,
  offset = 0,
  pageSize: number,
  totalCount?: number,
): InfiniteResponse<T> => {
  console.log('data', data, 'offset', offset, 'pageSize', pageSize, 'totalCount', totalCount);
  const newOffset = offset + pageSize;
  const total = totalCount ?? 0;
  console.log('newOffset', newOffset, 'total', total);

  return {
    ...data,
    newOffset: newOffset < total ? newOffset : undefined,
  };
};

export type OmitLimitOffset<T extends (...args: any) => any> = Omit<
  NonNullable<Parameters<T>[0]>,
  'limit' | 'offset'
>;
