import { createQuery } from 'react-query-kit';
import { TaleboundError } from '../../utils/types/error';
import { PbEntityGroup } from '../../generated/api-types/data-contracts';
import { MenusCollection } from '../collections';

interface GetMenuItemContentRequest {
  menuId: number;
  menuItemId: number;
}

export type EntityGroupContentHierarchy =
  | {
      type: 'GROUP';
      entityGroupId: number;
      position: number;
      children: EntityGroupContentHierarchy[];
    }
  | {
      type: 'ENTITY';
      entityId: number;
      position: number;
    };

type GetMenuItemContentResponse = {
  entityGroups: Record<number, PbEntityGroup>;
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

    const obj: Record<number, EntityGroupContentHierarchy | undefined> = {};

    data.contents?.forEach((c) => {
      const id = c.contentEntityId ?? c.contentEntityGroupId;
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
        }
        const thisObj = obj[id]!;
        if (c.entityGroupId) {
          const parent = obj[c.entityGroupId];
          if (!parent) {
            obj[c.entityGroupId] = {
              type: 'GROUP',
              entityGroupId: c.entityGroupId,
              position: 1,
              children: [thisObj],
            };
          } else if (parent.type === 'GROUP') {
            parent.children.push(thisObj);
          }
        }
      }
    });

    const mainHierarchy = obj[data.mainGroupId!];

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
