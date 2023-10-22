import { useGetWorldsOfCreator } from '../api/users/useGetWorldsOfCreator';
import { useSelector } from 'react-redux';
import { ReduxState } from '../store';
import { useMemo } from 'react';
import { UserWorldMap } from '../utils/types/UserWorldMap';

interface WorldAdmin {
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

/**
 * Currently only supports ADMIN of a world
 */
export function useWorldsOfUser(userId: number): UserWorldMap {
  const { data: worldCreatorData } = useGetWorldsOfCreator({
    variables: userId ?? 0,
  });

  return worldCreatorData ?? {};
}

export function useMyWorlds(): UserWorldMap {
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);

  return useWorldsOfUser(userId ?? -1);
}

export function useUserWorldAdmin(userId: number, worldId: number): WorldAdmin {
  const world = useWorldsOfUser(userId ?? -1)[worldId];

  return useMemo(() => {
    return {
      isAdmin: world?.isAdmin ?? false,
      isSuperAdmin: world?.isSuperAdmin ?? false,
    };
  }, [world]);
}

export function useMyWorldAdmin(worldId: number): WorldAdmin {
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);

  return useUserWorldAdmin(userId ?? -1, worldId);
}
