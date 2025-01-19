import { useSelector } from './services/store';
import {
  selectIsAuthChecked,
  selectUser
} from './services/slices/userSlice/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { ReactElement } from 'react';

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

  if (!isAuthChecked) {
    console.log('WAIT USER CHECKOUT');
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' replace state={location.pathname} />; //location.pathname{ from: location }

  return children;
};
