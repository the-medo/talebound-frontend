import { useGetWorldAdmins } from '../api/worlds/useGetWorldAdmins';
import { PbWorldAdmin } from '../generated/api-types/data-contracts';
import { ReduxState } from '../store';
import { useSelector } from 'react-redux';

export enum WorldAdminRole {
  NONE = 'NONE',
  COLLABORATOR = 'COLLABORATOR',
  SUPER_COLLABORATOR = 'SUPER_COLLABORATOR',
  REQUESTED = 'REQUESTED',
  DENIED = 'DENIED',
}

export function useWorldAdmins(worldId: number): PbWorldAdmin[] {
  const { data: worldAdminData } = useGetWorldAdmins({
    enabled: worldId > 0,
    variables: worldId ?? 0,
  });

  return worldAdminData ?? [];
}

export function useMyWorldRole(worldId: number): WorldAdminRole {
  const userId = useSelector((state: ReduxState) => state.auth.user?.id);
  const worldAdmins = useWorldAdmins(worldId);

  const myAdmin = worldAdmins.find((worldAdmin) => worldAdmin.userId === userId);

  if (myAdmin) {
    switch (myAdmin.approved) {
      case 2:
        return WorldAdminRole.REQUESTED;
      case 0:
        return WorldAdminRole.DENIED;
      case 1:
        return myAdmin.superAdmin ? WorldAdminRole.SUPER_COLLABORATOR : WorldAdminRole.COLLABORATOR;
    }
  }
  return WorldAdminRole.NONE;
}
