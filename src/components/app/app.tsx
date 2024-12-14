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
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { getFeeds } from '../../services/slices/feedSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  let state = location.state as { background?: Location };
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={state?.background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/profile'>
          <Route index element={<Profile />} />
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {state?.background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={() => {}} title={'Детали ингредиента'}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path='/feed/:number'
            element={
              <Modal onClose={() => {}} title={''}>
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path='/profile/orders/:number'
            element={
              <Modal onClose={() => {}} title={''}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
