import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { TUserState } from './type';
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './user-thunk';

export const initialState: TUserState = {
  isAuthChecked: true,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  user: null,
  registerData: {
    email: '',
    name: '',
    password: ''
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectUserLoginError: (state) => state.error
  },
  extraReducers: (builder: ActionReducerMapBuilder<TUserState>) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.error = error.message;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        state.user = payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.error = error.message;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = payload.user;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
      });
  }
});

export const {
  selectIsAuthChecked,
  selectUser,
  selectIsAuthenticated,
  selectUserLoginError
} = userSlice.selectors;

export default userSlice.reducer;
