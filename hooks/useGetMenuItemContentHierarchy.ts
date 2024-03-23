import { useGetMenuItemContent } from '../api/menus/useGetMenuItemContent';
import { PbEntityGroup, PbEntityGroupContent } from '../generated/api-types/data-contracts';
import { useMemo } from 'react';

export type EntityGroupContentHierarchyEntityGroup = {
  id: number;
  type: 'GROUP';
  hierarchyId: string;
  entityGroupId: number;
  position: number;
  children: EntityGroupContentHierarchy[];
};

export type EntityGroupContentHierarchyEntity = {
  id: number;
  type: 'ENTITY';
  hierarchyId: string;
  entityId: number;
  position: number;
};

export type EntityGroupContentHierarchy =
  | EntityGroupContentHierarchyEntityGroup
  | EntityGroupContentHierarchyEntity;

export type EntityGroupObject = Record<number, PbEntityGroup | undefined>;

export type MenuItemContentHierarchy = {
  entityGroups: EntityGroupObject;
  hierarchy: EntityGroupContentHierarchyEntityGroup;
};

const emptyResponse: MenuItemContentHierarchy = {
  entityGroups: {},
  hierarchy: {
    id: 0,
    type: 'GROUP',
    hierarchyId: 'g0',
    entityGroupId: 0,
    position: 1,
    children: [],
  },
};

export const useGetMenuItemContentHierarchy = (menuItemId: number): MenuItemContentHierarchy => {
  const { data: menuItemContent } = useGetMenuItemContent({
    variables: { menuItemId },
  });

  return useMemo(() => {
    const rsp: MenuItemContentHierarchy = { ...emptyResponse };
    if (menuItemContent) {
      const obj: Record<string, EntityGroupContentHierarchy | undefined> = {};

      const getId = (egc: PbEntityGroupContent) =>
        egc.contentEntityId ? `e${egc.contentEntityId}` : `g${egc.contentEntityGroupId}`;

      menuItemContent?.contents?.forEach((c) => {
        if (!c.id) return;
        console.log('C ... ', c);
        const id = getId(c);
        if (id) {
          if (!obj[id]) {
            if (c.contentEntityId) {
              obj[id] = {
                id: c.id,
                type: 'ENTITY',
                hierarchyId: '',
                entityId: c.contentEntityId,
                position: c.position ?? 1,
              };
            } else if (c.contentEntityGroupId) {
              obj[id] = {
                id: c.id,
                type: 'GROUP',
                hierarchyId: '',
                entityGroupId: c.contentEntityGroupId,
                position: c.position ?? 1,
                children: [],
              };
            }
          } else {
            const asdf = obj[id];
            console.log('HERE!', asdf);
            if (asdf?.type === 'GROUP') {
              asdf.entityGroupId = c.entityGroupId ?? 0;
            }
          }
          const thisObj = obj[id]!;
          if (c.entityGroupId) {
            const isTopLevelGroup = menuItemContent.mainGroupId === c.entityGroupId;
            const parentId = `g${c.entityGroupId}`;
            let parent = obj[parentId];
            if (!parent) {
              obj[parentId] = {
                id: isTopLevelGroup ? 0 : c.id,
                type: 'GROUP',
                hierarchyId: parentId,
                entityGroupId: isTopLevelGroup ? 0 : c.entityGroupId,
                position: isTopLevelGroup ? 1 : c.position ?? 1,
                children: [thisObj],
              };
              parent = obj[parentId];
            } else if (parent.type === 'GROUP') {
              parent.children.push(thisObj);
            }
            thisObj.hierarchyId = `${parent?.hierarchyId}-${id}`;
          }
        }
      });
      const mainHierarchy = obj[`g${menuItemContent.mainGroupId!}`];
      console.log('obj', obj);
      console.log('mainHierarchy', mainHierarchy);

      if (mainHierarchy?.type === 'GROUP') rsp.hierarchy = mainHierarchy;

      menuItemContent.groups?.forEach((g) => {
        console.log('G', g);
        if (g.id) rsp.entityGroups[g.id] = g;
      });
    }

    return rsp;
  }, [menuItemContent]);
};
