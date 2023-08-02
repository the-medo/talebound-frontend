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
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<PbUser>) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      } else {
        state.user = action.payload;
      }
      setItem(LSKey.USER, state.user);
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
