import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  loginUser,
  selectIsAuthenticated,
  selectUserLoginError
  // selectUserCheckSuccess
} from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const error = useSelector(selectUserLoginError) ?? '';

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!email.length || !password.length) return;
    dispatch(loginUser({ email, password }));
    // if (isAuthenticated) navigate('/');
  };

  //TODO: для чего хук

  // useEffect(() => {
  //   if (isLoginSuccess) navigate('/');
  // }, [isLoginSuccess]);

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

//  Maksim Dahovnik
//  dahovnik@ayandex.ru
//  87654321
