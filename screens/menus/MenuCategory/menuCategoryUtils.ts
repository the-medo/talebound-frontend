import { UniqueIdentifier } from '@dnd-kit/core';

export const isOverCheck = (
  contentHierarchyId: string,
  overId: UniqueIdentifier | undefined,
): boolean =>
  (
    [
      contentHierarchyId + '-drop-move',
      contentHierarchyId + '-drop-new-group',
    ] as UniqueIdentifier[]
  ).includes(overId ?? '');
