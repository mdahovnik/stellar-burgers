import { TUser } from '@utils-types';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { loginUserApi, registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';

export interface IUserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean; // если авторизовались то true
  loginUserError: string | null | undefined;
  loginUserRequest: boolean;
  loginSuccess: boolean;
  loginData: TUser;
  registerData: TRegisterData;
}

const initialState: IUserState = {
  isAuthChecked: false, // флаг для статуса проверки токена пользователя
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false,
  loginSuccess: false,
  loginData: {
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
      setCookie('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    return data;
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  selectors: {
    selectLoginSuccess: (state) => state.loginSuccess,
    selectUserName: (state) => state.loginData.name
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginSuccess = action.payload.success;
        state.loginData = action.payload.user;
        state.loginUserRequest = false;
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
      });
  }
});

export const { selectLoginSuccess, selectUserName } = userSlice.selectors;
export default userSlice.reducer;
