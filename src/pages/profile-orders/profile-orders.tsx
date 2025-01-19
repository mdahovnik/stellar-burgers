import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearOrders,
  getOrders,
  selectOrders
} from '../../services/slices/orderSlice/orderSlice';

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
