import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MenuCategoryState {
  rearrangeMode: boolean;
}

const initialState: MenuCategoryState = {
  rearrangeMode: false,
};

export const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState,
  reducers: {
    setRearrangeMode: (state, action: PayloadAction<boolean>) => {
      state.rearrangeMode = action.payload;
    },
  },
});

export const { setRearrangeMode } = menuCategorySlice.actions;

export const menuCategoryReducer = menuCategorySlice.reducer;
