import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

export interface MenuCategoryState {
  editMode: boolean;
  draggingData: EntityGroupContentHierarchy | undefined;
  menuId: number;
  menuItemId: number;
}

const initialState: MenuCategoryState = {
  editMode: false,
  draggingData: undefined,
  menuId: 0,
  menuItemId: 0,
};

export const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setDraggingData: (state, action: PayloadAction<MenuCategoryState['draggingData']>) => {
      state.draggingData = action.payload;
    },
    setMenuData: (state, action: PayloadAction<{ menuId: number; menuItemId: number }>) => {
      state.menuId = action.payload.menuId;
      state.menuItemId = action.payload.menuItemId;
    },
  },
});

export const { setEditMode, setDraggingData, setMenuData } = menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
