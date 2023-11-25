import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PbModule } from '../generated/api-types/data-contracts';

export interface MappingState {
  worldsModule: Record<number, number>;
}

const initialState: MappingState = {
  worldsModule: {},
};

export const mappingSlice = createSlice({
  name: 'mapping',
  initialState,
  reducers: {
    mapModules: (state, action: PayloadAction<PbModule[]>) => {
      action.payload.forEach((module) => {
        const { worldId } = module;
        if (worldId && module.id) {
          state.worldsModule[worldId] = module.id;
        }
      });
    },
  },
});

export const { mapModules } = mappingSlice.actions;

export const mappingReducer = mappingSlice.reducer;
