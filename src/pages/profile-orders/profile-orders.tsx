import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { getOrders } from '../../services/slices/orderSlice/order-thunk';
import { clearOrders } from '../../services/slices/orderSlice/orderSlice';
import { selectOrders } from '../../services/store/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    return () => {
      dispatch(clearOrders());
    };
  }, []);

  const orders: TOrder[] = useSelector(selectOrders);
  return <ProfileOrdersUI orders={orders} />;
};
