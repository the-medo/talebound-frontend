import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityGroupContentHierarchy } from '../../../api/menus/useGetMenuItemContent';

export interface MenuCategoryState {
  rearrangeMode: boolean;
  draggingData: EntityGroupContentHierarchy | undefined;
}

const initialState: MenuCategoryState = {
  rearrangeMode: false,
  draggingData: undefined,
};

export const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState,
  reducers: {
    setRearrangeMode: (state, action: PayloadAction<boolean>) => {
      state.rearrangeMode = action.payload;
    },
    setDraggingData: (state, action: PayloadAction<MenuCategoryState['draggingData']>) => {
      state.draggingData = action.payload;
    },
  },
});

export const { setRearrangeMode, setDraggingData } = menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
