import { PbWorld } from '../../generated/api-types/data-contracts';

export type UserWorldMap = Record<
  number,
  | {
      world: PbWorld;
      isAdmin: boolean;
      isSuperAdmin: boolean;
    }
  | undefined
>;
