import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import {
  getUser,
  selectIsAuthChecked,
  selectUser
} from '../../services/slices/userSlice';
import { Preloader } from '@ui';

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

  // если нахожусь на странице логина и есть пользователь
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  if (!onlyUnAuth && !user)
    return <Navigate to='/login' replace state={location.pathname} />; //location.pathname{ from: location }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  // let state = location.state as { background?: Location };
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        {/*<Route*/}
        {/*  path='/profile'*/}
        {/*  element={*/}
        {/*    <ProtectedRoute>*/}
        {/*      <Profile />*/}
        {/*    </ProtectedRoute>*/}
        {/*  }*/}
        {/*/>*/}
        {/*<Route*/}
        {/*  path='/profile/orders'*/}
        {/*  element={*/}
        {/*    <ProtectedRoute>*/}
        {/*      <ProfileOrders />*/}
        {/*    </ProtectedRoute>*/}
        {/*  }*/}
        {/*/>*/}

        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={closeModal} title={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal onClose={closeModal} title={'Детали заказа'}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              // <ProtectedRoute>
              <Modal onClose={closeModal} title={'Детали заказа'}>
                <OrderInfo />
              </Modal>
              // </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;

// accessToken Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWRlMjA3NzUwODY0MDAxZDM3MTQ4NCIsImlhdCI6MTczNDM2NTk3NCwiZXhwIjoxNzM0MzY3MTc0fQ.Ng6Rhn4OxjEnmKTcFy3NDIDhWsmyG5kq2lKDOVCekdI
