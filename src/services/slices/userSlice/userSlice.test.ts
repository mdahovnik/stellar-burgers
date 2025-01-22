import { TUserState } from './type';
import userReducer, {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';
import { TRegisterData } from '@api';

describe('userSlice test', () => {
  const error = new Error('test error');

  const dataResponse = {
    success: true,
    user: {
      email: 'test@test.com',
      name: 'testName'
    }
  };

  const initialState: TUserState = {
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

  const data: TRegisterData = {
    email: 'test@test.com',
    name: 'testName',
    password: 'testPassword'
  };

  describe('loginUser thunk test', () => {
    const { email, password } = data;

    it('should handle pending action', () => {
      const newState = userReducer(
        initialState,
        loginUser.pending('', { email, password })
      );
      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('should handle rejected action', () => {
      const newState = userReducer(
        initialState,
        loginUser.rejected(error, '', { email, password })
      );
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const authResponse = {
        success: true,
        refreshToken: '123',
        accessToken: '321',
        user: {
          name: 'testName',
          email: 'test@test.com'
        }
      };

      const newState = userReducer(
        initialState,
        loginUser.fulfilled(authResponse, '', { email, password })
      );

      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: {
          name: 'testName',
          email: 'test@test.com'
        }
      });
    });
  });

  describe('registerUser thunk test', () => {
    it('should handle pending action', () => {
      const newState = userReducer(
        initialState,
        registerUser.pending('', data)
      );

      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('should handle rejected action', () => {
      const newState = userReducer(
        initialState,
        registerUser.rejected(error, '', data)
      );
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const registerResponse = {
        email: 'test@test.com',
        name: 'testName'
      };

      const newState = userReducer(
        initialState,
        registerUser.fulfilled(registerResponse, '', data)
      );

      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        user: {
          email: 'test@test.com',
          name: 'testName'
        }
      });
    });
  });

  describe('getUser thunk test', () => {
    it('should handle pending action', () => {
      const newState = userReducer(initialState, getUser.pending(''));

      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('should handle rejected action', () => {
      const newState = userReducer(initialState, getUser.rejected(error, ''));
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const registerResponse = {
        success: true,
        user: {
          email: 'test@test.com',
          name: 'testName'
        }
      };

      const newState = userReducer(
        initialState,
        getUser.fulfilled(registerResponse, '')
      );

      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        user: {
          email: 'test@test.com',
          name: 'testName'
        }
      });
    });
  });

  describe('updateUser thunk test', () => {
    it('should handle pending action', () => {
      const newState = userReducer(initialState, updateUser.pending('', data));

      expect(newState).toEqual({
        ...initialState,
        isLoading: true,
        error: null
      });
    });

    it('should handle rejected action', () => {
      const newState = userReducer(
        initialState,
        updateUser.rejected(error, '', data)
      );
      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        error: error.message
      });
    });

    it('should handle fulfilled action', () => {
      const newState = userReducer(
        initialState,
        updateUser.fulfilled(dataResponse, '', data)
      );

      expect(newState).toEqual({
        ...initialState,
        isAuthChecked: true,
        isAuthenticated: true,
        error: null,
        isLoading: false,
        user: {
          email: 'test@test.com',
          name: 'testName'
        }
      });
    });
  });

  describe('logoutUser thunk test', () => {
    it('should handle fulfilled action', () => {
      const actualState = {
        ...initialState,
        isAuthChecked: false,
        user: {
          name: 'test',
          email: 'test@test.com'
        }
      };

      const newState = userReducer(
        actualState,
        logoutUser.fulfilled(undefined, '')
      );

      expect(newState.isAuthChecked).toBe(true);
      expect(newState.user).toBeNull();
    });
  });
});
