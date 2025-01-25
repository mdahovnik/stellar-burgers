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
  extraReducers: (builder: ActionReducerMapBuilder<TUserState>) => {
    // Authentication (login, logout)
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = error.message || 'Failed to login user';
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });

    // Registration
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.error = error.message || 'Failed to register user';
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = payload;
      });

    // Fetching User
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Failed to fetch user data';
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      });

    // Updating User
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message || 'Failed to update user data';
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.user = payload.user;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.isLoading = false;
        state.error = null;
      });
  }
});

export default userSlice.reducer;
