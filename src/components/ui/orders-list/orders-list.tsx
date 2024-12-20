import { FC } from 'react';

import styles from './orders-list.module.css';

import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';
import { Preloader } from '../preloader';

export const OrdersListUI: FC<OrdersListUIProps> = ({ orderByDate }) => (
  <>
    {/*{!orderByDate.length && <Preloader />}*/}
    {orderByDate && (
      <div className={`${styles.content}`}>
        {orderByDate.map((order) => (
          <OrderCard order={order} key={order._id} />
        ))}
      </div>
    )}
  </>
);
