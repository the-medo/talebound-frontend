export type InfiniteResponse<T> = T & {
  newOffset: number | undefined;
  totalCount: number;
};

export const expandDataForInfiniteQuery = <T>(
  data: T,
  offset = 0,
  pageSize: number,
  totalCount?: number,
): InfiniteResponse<T> => {
  const newOffset = offset + pageSize;
  const total = totalCount ?? 0;

  return {
    ...data,
    newOffset: newOffset < total ? newOffset : undefined,
    totalCount: total,
  };
};

export type OmitLimitOffset<T extends (...args: any) => any> = Omit<
  NonNullable<Parameters<T>[0]>,
  'limit' | 'offset'
>;
