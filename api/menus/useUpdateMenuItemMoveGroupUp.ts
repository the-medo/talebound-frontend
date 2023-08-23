import { createMutation, inferData } from 'react-query-kit';
import { MenusCollection } from '../collections';
import { queryClient } from '../../pages/_app';
import { useGetMenuItems } from './useGetMenuItems';
import { sortByPosition } from '../../utils/functions/sortByPosition';

export type MoveGroupUpParams = {
  menuId: number;
  menuItemId: number;
};

export const useUpdateMenuItemMoveGroupUp = createMutation({
  mutationFn: async (variables: MoveGroupUpParams) =>
    MenusCollection.taleboundUpdateMenuItemMoveGroupUp(variables.menuId, variables.menuItemId),

  onMutate: async (variables) => {
    const getMenuItemsQueryKey = useGetMenuItems.getKey(variables.menuId);
    const previousData = queryClient.getQueryData(getMenuItemsQueryKey) as inferData<
      typeof useGetMenuItems
    >;
    return { previousData, getMenuItemsQueryKey };
  },

  onError: (_err, _variables, context) => {
    if (context?.previousData) {
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(context.getMenuItemsQueryKey, []);
      queryClient.setQueryData<inferData<typeof useGetMenuItems>>(context.getMenuItemsQueryKey, [
        ...context.previousData,
      ]);
    }
  },

  onSuccess: (_data, variables) => {
    const { menuId, menuItemId } = variables;
    const getMenuItemsQueryKey = useGetMenuItems.getKey(menuId);

    queryClient.setQueryData<inferData<typeof useGetMenuItems>>(getMenuItemsQueryKey, (oldData) => {
      // Assuming oldData is sorted by position.

      if (oldData) {
        const data = oldData.sort(sortByPosition);

        // 1. Find the target group and previous group.
        const targetGroupStart = data.find((item) => item.id === menuItemId);
        if (!targetGroupStart?.position) return data;

        const targetGroupStartIdx = targetGroupStart.position;

        let targetGroupEndIdx = targetGroupStartIdx;

        for (let i = targetGroupStartIdx; i <= data.length && !data[i].isMain; i++) {
          targetGroupEndIdx = i;
        }

        const prevGroupEndIdx = targetGroupStartIdx - 1;
        let prevGroupStartIdx = prevGroupEndIdx;
        for (let i = prevGroupEndIdx - 1; i > 0 && !data[i].isMain; i--) {
          prevGroupStartIdx = i;
        }

        console.log(
          'prevGroupStartIdx',
          prevGroupStartIdx,
          'prevGroupEndIdx',
          prevGroupEndIdx,
          'targetGroupStartIdx',
          targetGroupStartIdx,
          'targetGroupEndIdx',
          targetGroupEndIdx,
        );

        // If no previous group, don't do anything.
        if (prevGroupStartIdx <= 0 || prevGroupEndIdx <= 0 || !data[prevGroupStartIdx]?.isMain) {
          return data;
        }

        return data.map((item) => {
          const p = item.position ?? 0;
          if (p < prevGroupStartIdx) {
            return item;
          } else if (p > targetGroupEndIdx) {
            return item;
          } else if (p >= prevGroupStartIdx && p <= prevGroupEndIdx) {
            return {
              ...item,
              position: p + targetGroupEndIdx - targetGroupStartIdx + 1,
            };
          } else if (p >= targetGroupStartIdx && p <= targetGroupEndIdx) {
            return {
              ...item,
              position: p - (targetGroupEndIdx - targetGroupStartIdx + 1),
            };
          }
        });

        // return [
        //   ...oldData.slice(0, prevGroupStartIdx),
        //   ...oldData.slice(targetGroupStartIdx, targetGroupEndIdx + 1),
        //   ...oldData.slice(prevGroupStartIdx, targetGroupStartIdx),
        //   ...oldData.slice(targetGroupEndIdx + 1),
        // ];
      }
      return oldData;
    });
  },
});
