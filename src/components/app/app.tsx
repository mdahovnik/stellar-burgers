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
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { ProtectedRoute } from '../../protectedRoute';
import { EP } from '../../utils/constants';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(-1);
  };

  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={EP.HOME}>
          <Route index element={<ConstructorPage />} />
          <Route path={EP.FEED} element={<Feed />} />
          <Route path={EP.PROFILE}>
            <Route index element={<ProtectedRoute children={<Profile />} />} />
            <Route
              path={EP.ORDERS}
              element={<ProtectedRoute children={<ProfileOrders />} />}
            />
          </Route>
          <Route
            path={EP.LOGIN}
            element={<ProtectedRoute children={<Login />} onlyUnAuth />}
          />
          <Route
            path={EP.REGISTER}
            element={<ProtectedRoute children={<Register />} onlyUnAuth />}
          />
          <Route
            path={EP.FORGOT_PASSWORD}
            element={
              <ProtectedRoute children={<ForgotPassword />} onlyUnAuth />
            }
          />
          <Route
            path={EP.RESET_PASSWORD}
            element={<ProtectedRoute children={<ResetPassword />} onlyUnAuth />}
          />
          <Route
            path={EP.PROFILE_ORDERS_NUMBER}
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали заказа
                </p>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path={EP.FEED_NUMBER}
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали заказа
                </p>
                <OrderInfo />
              </div>
            }
          />
          <Route
            path={EP.INGREDIENTS_ID}
            element={
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_main-large ${styles.detailHeader}`}
                >
                  Детали ингредиента
                </p>
                <IngredientDetails />
              </div>
            }
          />
          <Route path={EP.ANY} element={<NotFound404 />} />
        </Route>
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path={EP.INGREDIENTS_ID}
            element={
              <Modal
                onClose={closeModal}
                title={'Детали ингредиента'}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path={EP.FEED_NUMBER}
            element={
              <Modal
                onClose={closeModal}
                title={'Детали заказа'}
                children={<OrderInfo />}
              />
            }
          />
          <Route
            path={EP.PROFILE_ORDERS_NUMBER}
            element={
              <ProtectedRoute
                children={
                  <Modal
                    onClose={closeModal}
                    title={'Детали заказа'}
                    children={<OrderInfo />}
                  />
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
