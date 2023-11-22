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
import { entityAdapterSlice } from '../adapters/EntityAdapter';
import { userAdapterSlice } from '../adapters/UserAdapter';
import { imageAdapterSlice } from '../adapters/ImageAdapter';
import { locationAdapterSlice } from '../adapters/LocationAdapter';
import { mapAdapterSlice } from '../adapters/MapAdapter';
import { postAdapterSlice } from '../adapters/PostAdapter';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userReducer,
    [globalSlice.name]: globalReducer,
    [imageModalSlice.name]: imageModalReducer,
    [editorImageModalSlice.name]: editorImageModalReducer,
    //adapters:
    [moduleAdapterSlice.name]: moduleAdapterSlice.reducer,
    [entityAdapterSlice.name]: entityAdapterSlice.reducer,
    [userAdapterSlice.name]: userAdapterSlice.reducer,

    [worldAdapterSlice.name]: worldAdapterSlice.reducer,

    [imageAdapterSlice.name]: imageAdapterSlice.reducer,
    [locationAdapterSlice.name]: locationAdapterSlice.reducer,
    [mapAdapterSlice.name]: mapAdapterSlice.reducer,
    [postAdapterSlice.name]: postAdapterSlice.reducer,
  },
});

export type ReduxState = ReturnType<typeof store.getState>;

export type ReduxDispatch = typeof store.dispatch;
export type StoreAction<R> = ThunkAction<Promise<R>, ReduxState, unknown, AnyAction>;

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
