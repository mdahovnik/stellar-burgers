import { TUser } from '@utils-types';
import { TRegisterData } from '@api';

export type TUserState = {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  error: string | null | undefined;
  isLoading: boolean;
  user: TUser | null;
  registerData: TRegisterData;
};
