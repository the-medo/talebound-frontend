import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_HEADER_IMAGE =
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/efaae215-d5c5-4070-e61d-949f10521200/original';
const DEFAULT_MENU_IMAGE =
  'https://imagedelivery.net/zchNIWFramhipgMjPiGPQQ/59e16593-a12d-4c38-2394-64f0412cc700/250x50';

export interface GlobalSliceState {
  headerImage?: string;
  menuImage?: string;
}

const initialState: GlobalSliceState = {
  headerImage: DEFAULT_HEADER_IMAGE,
  menuImage: DEFAULT_MENU_IMAGE,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setHeaderImage: (state, action: PayloadAction<string | undefined>) => {
      state.headerImage = action.payload;
    },
    setMenuImage: (state, action: PayloadAction<string | undefined>) => {
      state.menuImage = action.payload;
    },
  },
});

export const { setHeaderImage, setMenuImage } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
