import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

export interface MenuCategoryState {
  editMode: boolean;
  draggingData: EntityGroupContentHierarchy | undefined;
  menuId: number;
  menuItemId: number;
  editEntityGroupId: number | undefined;
}

const initialState: MenuCategoryState = {
  editMode: false,
  draggingData: undefined,
  menuId: 0,
  menuItemId: 0,
  editEntityGroupId: undefined,
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
    setEditEntityGroupId: (state, action: PayloadAction<number | undefined>) => {
      state.editEntityGroupId = action.payload;
    },
  },
});

export const { setEditMode, setDraggingData, setMenuData, setEditEntityGroupId } =
  menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
