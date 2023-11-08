import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { PbViewModule } from '../generated/api-types/data-contracts';

export const ModuleAdapter = createEntityAdapter<PbViewModule>({
  selectId: (module) => module.moduleId!,
  sortComparer: (a, b) => a.moduleId! - b.moduleId!,
});

export const moduleAdapterSlice = createSlice({
  name: 'modules',
  initialState: ModuleAdapter.getInitialState(),
  reducers: {
    addModules: ModuleAdapter.addMany,
    addModule: ModuleAdapter.addOne,
    removeModule: ModuleAdapter.removeOne,
    updateModule: ModuleAdapter.updateOne,
    upsertModule: ModuleAdapter.upsertOne,
    upsertModules: ModuleAdapter.upsertMany,
    removeModules: ModuleAdapter.removeMany,
    removeAllModules: ModuleAdapter.removeAll,
  },
});
