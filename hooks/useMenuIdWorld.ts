import { useGetWorldById } from '../api/worlds/useGetWorldById';

export const useMenuIdWorld = (worldId: number) => {
  const { data: worldData } = useGetWorldById({ variables: worldId });
  return worldData?.worldMenuId ?? 0;
};
