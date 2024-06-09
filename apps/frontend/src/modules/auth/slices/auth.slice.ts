import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { type UserSignUpResponseDto } from '~/modules/auth/auth.js';

import { signUp } from './actions.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { ValueOf } from '~/libs/types/types.js';

type State = {
  user: UserSignUpResponseDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  user: null,
  dataStatus: DataStatus.IDLE
};

const { reducer, actions, name } = createSlice({
  initialState,
  name: 'auth',
  reducers: {},
  extraReducers(builder) {
    builder
      .addMatcher(isAnyOf(signUp.pending), state => {
        state.dataStatus = DataStatus.PENDING;
      })
      .addMatcher(isAnyOf(signUp.fulfilled), (state, action) => {
        state.user = action.payload;
        state.dataStatus = DataStatus.FULFILLED;
      })
      .addMatcher(isAnyOf(signUp.rejected), state => {
        state.user = null;
        state.dataStatus = DataStatus.REJECTED;
      });
  }
});

export { actions, name, reducer };
