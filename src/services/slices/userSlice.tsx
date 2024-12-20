import { TUser } from '@utils-types';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { setCookie } from '../../utils/cookie';
import { useDispatch } from '../store';

//TODO: почистить
export interface IUserState {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean; // если авторизовались то-true
  loginUserError: string | null | undefined;
  // loginUserRequest: boolean;
  // checkUserSuccess: boolean;
  isLoading: boolean;
  user: TUser | null;
  registerData: TRegisterData;
}

const initialState: IUserState = {
  isAuthChecked: true, // флаг для статуса проверки токена пользователя
  isAuthenticated: false, // если авторизовались то-true
  loginUserError: null,
  // loginUserRequest: false,
  // checkUserSuccess: false,
  isLoading: false,
  user: null,
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

export const getUser = createAsyncThunk('user/getUser', async () => {
  const res = await getUserApi();
  return res.user;
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) =>
    await logoutApi().then(() => {
      localStorage.clear();
      dispatch(logout());
    })
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthChecked = false;
      state.isAuthenticated = false;
    }
  },
  selectors: {
    // selectCheckUserSuccess: (state) => state.checkUserSuccess,
    // selectUserName: (state) => state.user.name,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectUser: (state) => state.user,
    selectIsLoading: (state) => state.isLoading,
    selectUserLoginError: (state) => state.loginUserError
  },
  extraReducers: (builder: ActionReducerMapBuilder<IUserState>) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.loginUserError = null;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.isLoading = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.loginUserError = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isLoading = false;
      });
  }
});

export const {
  // selectCheckUserSuccess,
  // selectUserName,
  selectIsAuthChecked,
  selectUser,
  selectIsLoading,
  selectIsAuthenticated,
  selectUserLoginError
} = userSlice.selectors;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
