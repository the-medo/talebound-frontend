import { createSlice, EntityState } from '@reduxjs/toolkit';
import { WorldAdapter } from './WorldAdapter';
import { PbViewModule, PbWorld } from '../generated/api-types/data-contracts';
import { ModuleAdapter } from './ModuleAdapter';

export interface AdapterSliceState {
  worlds: EntityState<PbWorld>;
  modules: EntityState<PbViewModule>;
}

const initialState: AdapterSliceState = {
  worlds: WorldAdapter.getInitialState(),
  modules: ModuleAdapter.getInitialState(),
};

export const adapterSlice = createSlice({
  name: 'adapters',
  initialState,
  reducers: {},
});
