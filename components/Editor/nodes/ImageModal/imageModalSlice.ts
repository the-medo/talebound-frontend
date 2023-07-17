import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InlineImagePayload } from '../InlineImageNode/InlineImageNode';
import { ImageVariant } from '../../../../utils/images/image_utils';

export interface ImageModalSliceState {
  inlineImagePayload: Omit<InlineImagePayload, 'caption'>;
  selectedVariant?: ImageVariant;
}

const initialState: ImageModalSliceState = {
  inlineImagePayload: {
    altText: '',
    src: '',
    position: 'left',
  },
  selectedVariant: undefined,
};

export const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState,
  reducers: {
    resetInlineImagePayload: (state) => {
      state.inlineImagePayload = initialState.inlineImagePayload;
      state.selectedVariant = initialState.selectedVariant;
    },
    updateInlineImagePayload: (state, action: PayloadAction<Partial<InlineImagePayload>>) => {
      state.inlineImagePayload = {
        ...state.inlineImagePayload,
        ...action.payload,
      };
    },
    setInlineImagePayload: (state, action: PayloadAction<InlineImagePayload>) => {
      state.inlineImagePayload = action.payload;
    },
    setSelectedVariant: (state, action: PayloadAction<ImageVariant>) => {
      state.selectedVariant = action.payload;
    },
  },
});

export const {
  resetInlineImagePayload,
  updateInlineImagePayload,
  setInlineImagePayload,
  setSelectedVariant,
} = imageModalSlice.actions;

export const imageModalReducer = imageModalSlice.reducer;
