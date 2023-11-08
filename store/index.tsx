import React, { ReactNode } from 'react';
import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userReducer, userSlice } from '../utils/auth/userSlice';
import {
  editorImageModalReducer,
  editorImageModalSlice,
} from '../components/Editor/nodes/ImageModal/editorImageModalSlice';
import { imageModalReducer, imageModalSlice } from '../components/ImageModal/imageModalSlice';
import { globalReducer, globalSlice } from './globalSlice';
import { Provider } from 'react-redux';
import { worldAdapterSlice } from '../adapters/WorldAdapter';
import { moduleAdapterSlice } from '../adapters/ModuleAdapter';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userReducer,
    [globalSlice.name]: globalReducer,
    [imageModalSlice.name]: imageModalReducer,
    [editorImageModalSlice.name]: editorImageModalReducer,
    //adapters:
    [worldAdapterSlice.name]: worldAdapterSlice.reducer,
    [moduleAdapterSlice.name]: moduleAdapterSlice.reducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;
export type StoreAction<R> = ThunkAction<Promise<R>, ReduxState, unknown, AnyAction>;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
