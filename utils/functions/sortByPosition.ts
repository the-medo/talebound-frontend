type HasPosition = {
  position?: number;
};

export const sortByPosition = (a: HasPosition, b: HasPosition) =>
  (a?.position ?? 0) - (b?.position ?? 0);
