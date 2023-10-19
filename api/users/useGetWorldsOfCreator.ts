import { createQuery } from 'react-query-kit';
import { UsersCollection } from '../collections';
import { imageModifyVariant, ImageVariant } from '../../utils/images/imageUtils';
import { UserWorldMap } from '../../utils/types/UserWorldMap';

/**
 * Get all worlds of a creator
 *
 * @param userId
 *
 * @returns {
 *   [1]: {
 *      world: PbWorld;
 *      superAdmin: boolean;
 *   },...
 * }
 *
 */

export const useGetWorldsOfCreator = createQuery<UserWorldMap, number>({
  primaryKey: 'useGetWorldsOfCreator',
  queryFn: async ({ queryKey: [, variables] }) => {
    if (!variables) return {};
    const { data } = await UsersCollection.usersGetWorldsOfCreator(variables);

    const rsp: UserWorldMap =
      data.worlds?.reduce((acc, { superAdmin, world }) => {
        if (world) {
          acc[world.id ?? -1] = {
            world: {
              ...world,
              imageAvatar: world.imageAvatar
                ? imageModifyVariant(world.imageAvatar, ImageVariant['200x200'])
                : undefined,
            },
            isAdmin: true,
            isSuperAdmin: superAdmin ?? false,
          };
        }
        return acc;
      }, {} as UserWorldMap) ?? {};

    return rsp;
  },
});
