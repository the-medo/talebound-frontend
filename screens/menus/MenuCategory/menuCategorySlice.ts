import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityGroupContentHierarchy } from '../../../hooks/useGetMenuItemContentHierarchy';

export type NewEntityGroupData =
  | {
      contentId: number;
      startEntityGroupId: number;
      startPosition: number;
      targetEntityGroupId: number;
      targetPosition: number;
    }
  | undefined;

export interface MenuCategoryState {
  editMode: boolean;
  draggingData: EntityGroupContentHierarchy | undefined;
  menuId: number;
  menuItemId: number;
  editEntityGroupId: number | undefined;
  newEntityGroupData: NewEntityGroupData;
}

const initialState: MenuCategoryState = {
  editMode: false,
  draggingData: undefined,
  menuId: 0,
  menuItemId: 0,
  editEntityGroupId: undefined,
  newEntityGroupData: undefined,
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
    setNewEntityGroupData: (state, action: PayloadAction<NewEntityGroupData>) => {
      state.newEntityGroupData = action.payload;
    },
  },
});

export const {
  setEditMode,
  setDraggingData,
  setMenuData,
  setEditEntityGroupId,
  setNewEntityGroupData,
} = menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
