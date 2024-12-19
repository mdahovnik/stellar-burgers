import { TUser } from '@utils-types';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { getUserApi, loginUserApi, registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';
//TODO: почистить
export interface IUserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean; // если авторизовались то-true
  loginUserError: string | null | undefined;
  loginUserRequest: boolean;
  checkUserSuccess: boolean;
  isLoading: boolean;
  user: TUser;
  registerData: TRegisterData;
}

const initialState: IUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false, // если авторизовались то-true
  loginUserError: null,
  loginUserRequest: false,
  checkUserSuccess: false,
  isLoading: false,
  user: {
    name: '',
    email: ''
  },
  registerData: {
    email: '',
    name: '',
    password: ''
  }
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    if (data?.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectCheckUserSuccess: (state) => state.checkUserSuccess,
    selectUserName: (state) => state.user.name,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectIsAuthenticated: (state) => state.isAuthenticated
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // state.loginUserRequest = false;
        state.isAuthChecked = false;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // state.checkUserSuccess = action.payload.success;
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.loginUserError = null;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        // state.registerData = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(getUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.checkUserSuccess = action.payload.success;
        // state.isAuthenticated = true;
        state.isAuthChecked = action.payload.success;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
      });
  }
});

export const {
  selectCheckUserSuccess: selectUserCheckSuccess,
  selectUserName,
  selectIsAuthChecked,
  selectUser,
  selectIsLoading,
  selectIsAuthenticated
} = userSlice.selectors;
export default userSlice.reducer;
