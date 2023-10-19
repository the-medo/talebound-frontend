import { useGetWorldAdmins } from '../api/worlds/useGetWorldAdmins';
import { PbWorldAdmin } from '../generated/api-types/data-contracts';
import { useSelector } from 'react-redux';
import { UserRole } from '../utils/auth/userUtils';

export enum WorldAdminRole {
  NONE = 'NONE',
  COLLABORATOR = 'COLLABORATOR',
  SUPER_COLLABORATOR = 'SUPER_COLLABORATOR',
  REQUESTED = 'REQUESTED',
  DENIED = 'DENIED',
}

export function useWorldAdmins(worldId: number): PbWorldAdmin[] {
  const { data: worldAdminData } = useGetWorldAdmins({
    variables: worldId ?? 0,
  });

  return worldAdminData ?? [];
}

export function useMyWorldRole(worldId: number): WorldAdminRole {
  const userId = useSelector((state) => state.auth.user?.id);
  const userRole = useSelector((state) => state.auth.role);
  const worldAdmins = useWorldAdmins(worldId);

  const myAdmin = worldAdmins.find((worldAdmin) => worldAdmin.userId === userId);

  if (userRole === UserRole.Admin) {
    return WorldAdminRole.SUPER_COLLABORATOR;
  }

  if (myAdmin) {
    switch (myAdmin.approved) {
      case 2:
        return WorldAdminRole.REQUESTED;
      case 1:
        return myAdmin.superAdmin ? WorldAdminRole.SUPER_COLLABORATOR : WorldAdminRole.COLLABORATOR;
      case 0:
      case undefined:
        return WorldAdminRole.DENIED;
    }
  }
  return WorldAdminRole.NONE;
}

export const isWorldCollaborator = (role: WorldAdminRole): boolean => {
  return role === WorldAdminRole.COLLABORATOR || role === WorldAdminRole.SUPER_COLLABORATOR;
};
