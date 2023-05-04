import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PbUser } from '../../generated/api-types/data-contracts';
import { getItem, LSKey, setItem } from '../../store/localStore';

export interface UserState {
  user: PbUser | undefined;
}

const initialState: UserState = {
  user: getItem(LSKey.USER),
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<PbUser | undefined>) => {
      setItem(LSKey.USER, action.payload);
      console.log('setUser action.payload', action.payload);
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
