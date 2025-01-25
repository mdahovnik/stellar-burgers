import { useSelector } from './services/store/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { ReactElement } from 'react';
import {
  selectIsAuthChecked,
  selectUser
} from './services/slices/userSlice/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();
  const user = useSelector(selectUser);

  const from = location.state?.from || { pathname: '/' };

  // Показываем лоадер, пока статус авторизации не проверен
  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  // Если маршрут только для неавторизованных, но пользователь уже авторизован
  if (onlyUnAuth && user) {
    return <Navigate replace to={from} />;
  }

  // Если маршрут только для авторизованных, но пользователь не авторизован
  if (!onlyUnAuth && !user)
    return <Navigate to='/login' replace state={{ from: location.pathname }} />; //location.pathname{ from: location }

  return children;
};
