export type InfiniteResponse<T> = T & { newOffset: number | undefined };

export const expandDataForInfiniteQuery = <T>(
  data: T,
  offset: number,
  pageSize: number,
  totalCount?: number,
): InfiniteResponse<T> => {
  const newOffset = offset + pageSize;
  const total = totalCount ?? 0;

  return {
    ...data,
    newOffset: newOffset < total ? newOffset : undefined,
  };
};

export type OmitLimitOffset<T extends (...args: any) => any> = Omit<
  NonNullable<Parameters<T>[0]>,
  'limit' | 'offset'
>;
