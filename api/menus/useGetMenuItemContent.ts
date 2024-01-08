import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbEntityGroup, PbEntityGroupContent } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

interface GetMenuItemContentRequest {
  menuId: number;
  menuItemId: number;
}

export type EntityGroupContentHierarchyEntityGroup = {
  type: 'GROUP';
  entityGroupId: number;
  position: number;
  children: EntityGroupContentHierarchy[];
};

export type EntityGroupContentHierarchyEntity = {
  type: 'ENTITY';
  entityId: number;
  position: number;
};

export type EntityGroupContentHierarchy =
  | EntityGroupContentHierarchyEntityGroup
  | EntityGroupContentHierarchyEntity;

export type EntityGroupObject = Record<number, PbEntityGroup | undefined>;

type GetMenuItemContentResponse = {
  entityGroups: EntityGroupObject;
  hierarchy: EntityGroupContentHierarchy;
};

const emptyResponse: GetMenuItemContentResponse = {
  entityGroups: {},
  hierarchy: {
    type: 'GROUP',
    entityGroupId: 0,
    position: 1,
    children: [],
  },
};

export const useGetMenuItemContent = createQuery<
  GetMenuItemContentResponse,
  GetMenuItemContentRequest,
  TaleboundError
>({
  primaryKey: 'useGetMenuItemContent',
  queryFn: async ({ queryKey: [_, { menuId, menuItemId }] }) => {
    if (menuId === 0 || menuItemId === 0) return emptyResponse;

    const { data } = await MenusCollection.menusGetMenuItemContent(menuId, menuItemId);

    const obj: Record<string, EntityGroupContentHierarchy | undefined> = {};

    const getId = (egc: PbEntityGroupContent) =>
      egc.contentEntityId ? `e-${egc.contentEntityId}` : `g-${egc.contentEntityGroupId}`;

    data.contents?.forEach((c) => {
      const id = getId(c);
      if (id) {
        if (!obj[id]) {
          if (c.contentEntityId) {
            obj[id] = {
              type: 'ENTITY',
              entityId: c.contentEntityId,
              position: c.position ?? 1,
            };
          } else if (c.contentEntityGroupId) {
            obj[id] = {
              type: 'GROUP',
              entityGroupId: c.contentEntityGroupId,
              position: c.position ?? 1,
              children: [],
            };
          }
        } else {
          const asdf = obj[id];
          if (asdf?.type === 'GROUP') {
            asdf.entityGroupId = c.entityGroupId ?? 0;
          }
        }
        const thisObj = obj[id]!;
        if (c.entityGroupId) {
          const parent = obj[`g-${c.entityGroupId}`];
          if (!parent) {
            obj[`g-${c.entityGroupId}`] = {
              type: 'GROUP',
              entityGroupId: 0,
              position: 1,
              children: [thisObj],
            };
          } else if (parent.type === 'GROUP') {
            parent.children.push(thisObj);
          }
        }
      }
    });

    const mainHierarchy = obj[`g-${data.mainGroupId!}`];

    const rsp: GetMenuItemContentResponse = {
      entityGroups: {},
      hierarchy: mainHierarchy!,
    };

    data.groups?.forEach((g) => {
      if (g.id) rsp.entityGroups[g.id] = g;
    });

    return rsp;
  },
});
