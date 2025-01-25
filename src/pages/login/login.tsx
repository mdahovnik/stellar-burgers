import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store/store';
import { loginUser } from '../../services/slices/userSlice/user-thunk';
import { selectUserLoginError } from '../../services/store/selectors';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectUserLoginError) ?? '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email.length || !password.length) return;
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
